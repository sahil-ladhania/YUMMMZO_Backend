# Prisma

This folder contains the database schema and migration files managed by Prisma ORM.

## Structure:
- **schema.prisma**: The central file where all database models and relationships are defined.
- **migrations/**: Automatically generated files that track schema changes over time.

## Commands:
- `npx prisma migrate dev`: Apply new migrations locally.
- `npx prisma db pull`: Update your schema based on the current state of the database.
- `npx prisma generate`: Generates Prisma client code based on the schema.

## Setup:
- Ensure the `.env` file contains the correct `DATABASE_URL` for Prisma to connect to the database.