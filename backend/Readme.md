# Backend Setup Guide

This is a Node.js/Express backend using TypeScript, with Drizzle ORM for database management.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Database Setup

The project uses SQLite with Drizzle ORM. To initialize the database:

```bash
npm run init
```

This command will:
- Initialize the database schema
- Seed the database with initial data

## Development

To start the development server with hot reload:

```bash
npm run dev
```

The server will start on the default port (check your .env file or console output for the exact port).

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run init` - Initialize and seed the database
- `npm run db:init` - Initialize database schema
- `npm run db:seed` - Seed the database with initial data
- `npm run db:studio` - Open Drizzle Studio for database management

## Project Structure

- `index.ts` - Main application entry point
- `db/` - Database configuration and migrations
- `types/` - TypeScript type definitions
- `drizzle.config.ts` - Drizzle ORM configuration

## Dependencies

Main dependencies:
- Express - Web framework
- Drizzle ORM - Database ORM
- libsql - SQLite client
- dotenv - Environment variable management

Dev dependencies:
- tsx - TypeScript execution and REPL
- drizzle-kit - Drizzle CLI tools
- TypeScript type definitions
