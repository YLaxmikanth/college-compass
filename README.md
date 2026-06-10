## College Compass

College Compass is a Next.js 16 App Router MVP for discovering, comparing, and saving colleges with PostgreSQL, Prisma 7, NextAuth, Zod, and Zustand.

## Getting Started

### 1. Configure environment variables

Create a `.env` file from `.env.example` and set:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`

### 2. Generate the Prisma client

```bash
npx prisma generate
```

### 3. Seed the database

```bash
npm run db:seed
```

### 4. Start the app

```bash
npm run dev
```

Open http://localhost:3000.

## Available routes

- `/`
- `/colleges`
- `/colleges/[id]`
- `/compare`
- `/login`
- `/register`

## Deployment notes

- Set the production `DATABASE_URL` to your Neon connection string.
- Add a strong `NEXTAUTH_SECRET`.
- Set `NEXT_PUBLIC_APP_URL` to your deployed domain.
- Run `npx prisma generate` and `npx prisma db push` before deploying if the database is empty.
