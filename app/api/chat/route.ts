import { db } from "@/app/db";
import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from "ai";
import z from "zod";

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const SYS_PROMPT =
        `You are an expert SQL assistant that helps users to query their database using natural language. 
           You have access to following tools:
           ${new Date().toLocaleString('sv-SE')}
           1. schema tool - call this tool to get the database schema which will help you to write sql query.
           2. db tool - call this tool to query the database.
           Rules:
           - Generate ONLY SELECT queries (no INSERT, UPDATE, DELETE, DROP)
           - Always use the schema provided by the schema tool
           - Return valid SQLite syntax
           Always respond in a helpful, conversational tone while being technically accurate.`;

    const result = streamText({
        model: google("gemini-3-flash-preview"),
        messages: await convertToModelMessages(messages),
        system: SYS_PROMPT,
        stopWhen: stepCountIs(5),
        tools: {
            db: tool({
                description: "Call this tool to query Database",
                inputSchema: z.object({
                    query: z.string().describe("The SQL Query to be ran."),
                }),
                execute: async ({ query }) => {
                    const trimmedQuery = query.trim().toUpperCase();

                    if (!trimmedQuery.startsWith('SELECT')) {
                        return {
                            error: "Only SELECT queries are allowed. No INSERT, UPDATE, DELETE, or DROP operations.",
                            query
                        };
                    }

                    const dangerousKeywords = [
                        'DROP', 'DELETE', 'INSERT', 'UPDATE',
                        'ALTER', 'CREATE', 'TRUNCATE', 'EXEC',
                        'EXECUTE', 'PRAGMA'
                    ];

                    for (const keyword of dangerousKeywords) {
                        if (trimmedQuery.includes(keyword)) {
                            return {
                                error: `Dangerous keyword detected: ${keyword}. Only SELECT queries are allowed.`,
                                query
                            };
                        }
                    }

                    try {
                        const result = await db.run(`${query} LIMIT 1000`);
                        return {
                            success: true,
                            result,
                            query
                        };
                    } catch (error) {
                        return {
                            error: error,
                            query
                        };
                    }
                },
            }),

            schema: tool({
                description: "Call this tool to get the complete database schema (tables, columns, types)",
                inputSchema: z.object({}),
                execute: async () => {
                    const schema = `
               CREATE TABLE products (
                    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                    name text NOT NULL,
                    price real NOT NULL,
                    description text NOT NULL,
                    stock integer DEFAULT 0 NOT NULL,
                    category text NOT NULL
                );
               CREATE TABLE sales (
                    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                    product_id integer NOT NULL,
                    quantity integer DEFAULT 1 NOT NULL,
                    total_amount real NOT NULL,
                    created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    region text NOT NULL,
                    sales_date text DEFAULT CURRENT_TIMESTAMP,
                    customer_name text NOT NULL,
                    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE no action ON DELETE no action
                );`;
                    return {
                        result: schema,
                    };
                },
            }),
        }
    },
    );

    return result.toUIMessageStreamResponse();
}