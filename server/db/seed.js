import bcrypt from "bcryptjs";
import pool from "./index.js";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error("Error: ADMIN_PASSWORD must be set in your .env file.");
  process.exit(1);
}

async function seed() {
  const client = await pool.connect();
  try {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await client.query(
      `INSERT INTO admins (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [ADMIN_USERNAME, hash],
    );

    console.log("Admin account created/updated:");
    console.log(`   Username: ${ADMIN_USERNAME}`);
    console.log(`   Password: [set via ADMIN_PASSWORD env var]`);
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
