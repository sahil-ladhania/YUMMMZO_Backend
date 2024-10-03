# Models

This folder contains Prisma models for interacting with the database.

## Structure:
- Each model corresponds to a database table (e.g., `User`, `Restaurant`, `Order`).
- Defined in the `schema.prisma` file for database schema management.
- Models represent entities in the app like users, restaurants, orders, etc.

## Example:
- **User Model**: Defines the user schema, relationships, and attributes (name, email, role, etc.).
- **Order Model**: Represents customer orders, linked with users and restaurants.