# AI-Solutions — Full Stack Application

A full-stack web application for **AI-Solutions**, a Sunderland-based AI start-up.

Built with **React + Vite**, **TailwindCSS**, **shadcn/ui**, **Node.js (Express)**, and **PostgreSQL**.

---

## Project Structure

```
ai-solutions/
├── client/        # React frontend (Vite + TailwindCSS + shadcn/ui)
└── server/        # Node.js + Express API backend
```

---

## Prerequisites

- Node.js v18+
- PostgreSQL 14+
- npm or yarn

---

## 1. Database Setup

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE ai_solutions;"

# Run the schema
psql -U postgres -d ai_solutions -f server/db/schema.sql
```

---

## 2. Server Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your DB credentials and secrets
npm run dev
```

The API server runs on **http://localhost:5000**.

**Default Admin Credentials:**

- Username: `admin`
- Password: `Admin@2025`

The admin account is created automatically when you run `npm run seed`.

```bash
npm run seed    # creates the admin account
```

---

## 3. Client Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**.

---

## Pages

| Route           | Description                        |
| --------------- | ---------------------------------- |
| `/`             | Home — hero, stats, features, USPs |
| `/solutions`    | Software solutions offered         |
| `/case-studies` | Past industry solutions            |
| `/testimonials` | Customer feedback & ratings        |
| `/blog`         | Articles & company news            |
| `/gallery`      | Promotional event photos           |
| `/events`       | Upcoming events                    |
| `/contact`      | Contact Us form                    |
| `/admin`        | Password-protected admin area      |

---

## API Endpoints

| Method | Route                  | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/api/contact`         | Submit contact enquiry        |
| POST   | `/api/admin/login`     | Admin login                   |
| POST   | `/api/admin/logout`    | Admin logout                  |
| GET    | `/api/admin/inquiries` | Get all inquiries (protected) |
| GET    | `/api/admin/stats`     | Get inquiry stats (protected) |

---

## Environment Variables (server/.env)

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_solutions
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:5173
```
