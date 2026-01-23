# SQL Assistant

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-3982CE?style=for-the-badge&logo=Drizzle&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-316192?style=for-the-badge&logo=sqlite&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-316192?style=for-the-badge&logo=gemini&logoColor=white)

A modern, AI-powered natural language interface for querying SQLite databases. Built with Next.js, Vercel AI SDK, Google's Gemini AI, and Drizzle ORM, this application allows users to interact with their database using conversational language instead of writing SQL queries manually.

## Overview

SQL Assistant transforms natural language questions into SQL queries, executes them safely, and presents results in an intuitive chat interface. The application features real-time streaming responses, automatic schema detection, and built-in security measures to prevent destructive database operations.

## Key Features

### Natural Language Querying

Ask questions about your data in plain English, and the AI will generate and execute the appropriate SQL queries automatically.

### Real-Time Streaming

Experience instant feedback with streaming responses powered by Google's Gemini AI model, providing a smooth and responsive user experience.

### Database Schema Awareness

The assistant automatically understands your database structure and uses it to generate accurate, context-aware queries.

### Security First

Built-in safeguards prevent destructive operations by restricting queries to SELECT statements only, with additional keyword filtering for dangerous SQL commands.

### Modern UI/UX

Clean, responsive interface with dark mode support, smooth animations, and visual feedback for query execution and results.

### Type-Safe Development

Full TypeScript implementation with Drizzle ORM ensures type safety throughout the application stack.

## Technology Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **TailwindCSS 4** - Utility-first CSS framework
- **TypeScript 5** - Type-safe development

### Backend & AI

- **Google Gemini AI** - Advanced language model for natural language processing
- **AI SDK** - Vercel's AI SDK for streaming and tool integration
- **Drizzle ORM** - Type-safe SQL toolkit
- **LibSQL** - SQLite-compatible database

### Database Schema

The application includes two main tables:

**Products Table**

- Product information including name, price, description, stock levels, and category

**Sales Table**

- Sales transactions with product references, quantities, amounts, regions, dates, and customer information

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Google AI API key (for Gemini access)
- Basic understanding of SQL databases

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yashraj639/SQL-Agent.git
cd SQL-Agent
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

Add your Google AI API key and database configuration to `.env.local`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
```

4. Generate and run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

5. Seed the database with sample data:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command               | Description                                 |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Start development server                    |
| `npm run build`       | Build for production                        |
| `npm run start`       | Start production server                     |
| `npm run lint`        | Run ESLint                                  |
| `npm run db:generate` | Generate database migrations                |
| `npm run db:migrate`  | Run database migrations                     |
| `npm run db:seed`     | Seed database with sample data              |
| `npm run db:studio`   | Open Drizzle Studio for database management |

## Usage Examples

### Basic Queries

- "How many products do we have in stock?"
- "Show me all sales from the last month"
- "What are our top-selling products?"

### Aggregations

- "What's the total revenue by region?"
- "Calculate average order value"
- "Show me sales trends by category"

### Complex Queries

- "Which products have low stock levels?"
- "Find customers who made purchases over $1000"
- "Compare sales performance across different regions"

## Architecture

### Chat Interface

The main chat interface (`app/page.tsx`) handles user interactions, displays messages, and renders tool execution results with appropriate visual feedback.

### API Route

The chat API route (`app/api/chat/route.ts`) processes incoming messages, manages AI interactions, and coordinates tool execution for database queries and schema retrieval.

### Database Layer

Drizzle ORM provides type-safe database access with schema definitions in `app/db/schema.ts` and connection management in `app/db/index.ts`.

### AI Tools

**Database Query Tool**

- Validates and executes SELECT queries
- Enforces security restrictions
- Returns formatted results or error messages

**Schema Tool**

- Provides complete database schema information
- Helps AI understand table structures and relationships
- Enables accurate query generation

## Security Features

### Query Restrictions

Only SELECT statements are permitted. All INSERT, UPDATE, DELETE, DROP, and other destructive operations are blocked.

### Keyword Filtering

Additional layer of protection against dangerous SQL keywords including PRAGMA, EXEC, ALTER, CREATE, and TRUNCATE.

### Result Limiting

All queries are automatically limited to 1000 rows to prevent performance issues and excessive data transfer.

### Input Validation

Zod schemas validate all inputs before processing, ensuring type safety and preventing injection attacks.

## Development

### Project Structure

```
ai-agent/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── db/
│   │   ├── index.ts              # Database connection
│   │   ├── schema.ts             # Database schema definitions
│   │   └── seed.ts               # Database seeding script
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat interface
├── public/                       # Static assets
├── drizzle.config.ts            # Drizzle configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

### Adding New Features

**Extending the Database Schema**

1. Update `app/db/schema.ts` with new table definitions
2. Run `npm run db:generate` to create migrations
3. Run `npm run db:migrate` to apply changes
4. Update the schema tool in `app/api/chat/route.ts`

**Adding New AI Tools**

1. Define tool schema using Zod in `app/api/chat/route.ts`
2. Implement execute function with business logic
3. Update system prompt to inform AI about new capabilities
4. Add UI handling in `app/page.tsx` for tool results

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- Database management with [Drizzle ORM](https://orm.drizzle.team/)
- UI components styled with [TailwindCSS](https://tailwindcss.com/)

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/yashraj639/SQL-Agent/issues).

---

**Note:** This application is designed for development and demonstration purposes. For production use, implement additional security measures, authentication, and access controls appropriate for your use case.
