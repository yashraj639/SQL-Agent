import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import z from "zod";

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const SYS_PROMPT =
        `You are an expert SQL assistant that helps users to query their database using natural language. 
           You have access to following tools:
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
        tools: {
            db: tool({
                description: "Call this tool to query Database",
                inputSchema: z.object({
                    query: z.string().describe("The SQL Query to be ran."),
                }),
                execute: async ({ query }) => {
                    console.log(query);
                    return {
                        query,
                        result: "Query executed successfully",
                    }
                },
            }),
        },
    });

    return result.toUIMessageStreamResponse();
}
