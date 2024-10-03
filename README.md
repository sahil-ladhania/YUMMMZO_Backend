# YUMMMZO - Backend

YUMMMZO is a food delivery app where users can order food, restaurant owners can manage orders, and delivery partners can accept or reject deliveries.

## Features

- **User Dashboard**: Browse restaurants, view menus, place orders, and track deliveries.
- **Restaurant Owner Dashboard**: Manage orders, update menus, and track incoming orders.
- **Delivery Partner Dashboard**: Accept or reject orders and view delivery routes.

## Tech Stack

- **Node.js** with **Express.js** for backend server.
- **MySQL** with **Prisma ORM** for database management.

## Project Structure

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── prisma/
├── tests/
├── public/
├── logs/
├── docs/
└── README.md
```
## Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up environment variables in a `.env` file (check `config/README.md` for details).
4. Run database migrations: `npx prisma migrate dev`.
5. Start the server: `npm run dev`.

## Scripts

- `npm run dev`: Start development server.

