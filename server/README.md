# AI-Solutions - Full Stack Application

A full-stack web application for **AI-Solutions**, a Sunderland-based AI start-up.

Built with **React + Vite**, **TailwindCSS**, **shadcn/ui**, **Node.js (Express)**, and **PostgreSQL**.

---

## Project Structure

```
ai-solutions/
|-- client/        # React frontend (Vite + TailwindCSS + shadcn/ui)
`-- server/        # Node.js + Express API backend
```

---

## Prerequisites

- Node.js v18+
- PostgreSQL 14+
- npm or yarn

---

## 1. Database Setup

The project does not use a separate `schema.sql` file. Create the database, then run the SQL below in PostgreSQL.

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE ai_solutions;"

# Open the database shell
psql -U postgres -d ai_solutions
```

Paste this SQL into the `psql` shell:

```sql
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  job_details TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'new',
  admin_notes TEXT NOT NULL DEFAULT '',
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT contacts_status_check
    CHECK (status IN ('new', 'reviewed', 'responded'))
);

CREATE INDEX IF NOT EXISTS contacts_status_idx
  ON contacts(status);

CREATE INDEX IF NOT EXISTS contacts_created_at_idx
  ON contacts(created_at DESC);

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  author VARCHAR(255) NOT NULL DEFAULT '',
  author_role VARCHAR(255) NOT NULL DEFAULT '',
  read_time VARCHAR(50) NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  body TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT articles_status_check
    CHECK (status IN ('draft', 'published'))
);

CREATE INDEX IF NOT EXISTS articles_status_idx
  ON articles(status);

CREATE INDEX IF NOT EXISTS articles_created_at_idx
  ON articles(created_at DESC);
```

---

## 2. Server Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_solutions
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=replace-this-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@2025
GEMINI_API_KEY=your-gemini-api-key
```

Create the admin account:

```bash
npm run seed
```

Then start the API:

```bash
npm run dev
```

The API server runs on **http://localhost:5000**.

The admin login uses the `ADMIN_USERNAME` and `ADMIN_PASSWORD` values from `.env`.

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
| `/`             | Home - hero, stats, features, USPs |
| `/#testimonials` | Customer feedback with ratings    |
| `/#events`      | Upcoming events section            |
| `/solutions`    | Software solutions offered         |
| `/case-studies` | Past industry solutions            |
| `/articles`     | Articles & company news            |
| `/articles/:slug` | Individual article page          |
| `/about`        | About the company                  |
| `/gallery`      | Promotional event photos           |
| `/contact`      | Contact Us form                    |
| `/admin/login`  | Admin login                        |
| `/admin/dashboard` | Password-protected admin dashboard |
| `/admin/enquiries` | Contact enquiry management      |
| `/admin/queries` | Chatbot query placeholder         |
| `/admin/articles` | Article management               |
| `/admin/gallery` | Gallery management placeholder    |

---

## API Endpoints

| Method | Route                  | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/api/contact`         | Submit contact enquiry        |
| POST   | `/api/admin/login`     | Admin login                   |
| POST   | `/api/admin/logout`    | Admin logout                  |
| GET    | `/api/admin/enquiries` | Get all enquiries (protected) |
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
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@2025
GEMINI_API_KEY=your-gemini-api-key
```
