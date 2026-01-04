# PimpMyQuote Backend

Backend service for PimpMyQuote, an application to collect, organize, and manage quotes from around the web.

## 🚀 Features

- User authentication via Supabase
- Virtual currency system for cover generation
- Cover art generation API
- PostgreSQL database with Prisma ORM

## 📋 Prerequisites

- Node.js >= 18.12
- PostgreSQL database
- Supabase account
- pnpm package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd pimp-my-quotes-be
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.development
```
Edit `.env.development` with your configuration:
- `PORT`: Server port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key

4. Set up the database:
```bash
pnpm db:push
```

## 🚀 Development

Start the development server:
```bash
pnpm dev
```

Other useful commands:
- `pnpm build`: Build the project
- `pnpm start`: Start in production mode
- `pnpm db:studio`: Open Prisma Studio
- `pnpm lint`: Check code style
- `pnpm lint:fix`: Fix code style issues

## 🗄️ Database Management

The project uses Prisma as ORM. Here are the main database commands:

### Development Commands
```bash
# Push schema changes to the database
pnpm db:push

# Generate Prisma Client
pnpm db:generate

# Open Prisma Studio (database GUI)
pnpm db:studio
```

### Working with Migrations
If you need to work with migrations instead of using `db:push`:

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply pending migrations
npx prisma migrate deploy

# Reset the database (careful: this will delete all data)
npx prisma migrate reset
```

### Database Utilities
```bash
# Format the schema.prisma file
npx prisma format

# Validate the schema.prisma file
npx prisma validate

# Pull the schema from an existing database
npx prisma db pull
```

Note: All these commands will automatically use the correct `.env` file based on your `NODE_ENV`.

## 🔒 Authentication

The API uses Supabase for authentication. All protected endpoints require a Bearer token:
```bash
Authorization: Bearer <supabase-jwt-token>
```

## 📝 API Endpoints

### Quotes
- `GET /quotes/` - Get user's stored quotes
- `POST /quotes/` - Create a quote
- `POST /quotes/daily` - Get the quote of the day

### Users
- `DELETE /users/` - Delete the user

## 📦 Project Structure

```
src/
├── config/     # Configuration and environment setup
├── routes/     # API route handlers
├── services/   # Business logic
├── types/      # TypeScript type definitions
├── utils/      # Utility functions
└── index.ts    # Application entry point
```

## 🔧 Environment Management

The project supports multiple environments:
- Development: `.env.development`
- Production: `.env.production`
- Test: `.env.test`

Environment is selected via `NODE_ENV` environment variable.
