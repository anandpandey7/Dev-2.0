import { getClient } from "./utils.js";
import bcrypt from "bcrypt";

async function insertUserData(username: string, email: string, password: string) {
  const client = await getClient(); // get a new client per call
  try {

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let initialQuery =  `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at;
      `;

    const res = await client.query(initialQuery,
      [username, email, hashedPassword]
    );

    console.log("✅ User inserted:", res.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Insert error:", err.message);
    } else {
      console.error("❌ Unknown error:", err);
    }
  } finally {
    await client.end();
  }
}

// Test calls
insertUserData("temp", "temp@example.com", "temp");
insertUserData("anandtemp", "anandtemp@example.com", "temptemp");
