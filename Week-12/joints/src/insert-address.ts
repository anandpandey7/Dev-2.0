import { getClient } from "./utils.js";

async function insertAddress(userId: number, street: string, city: string, state?: string, zipCode?: string, country?: string) {
  const client = await getClient(); // get a new client
  try {
    // Insert address safely using parameterized query
    const query = `
      INSERT INTO address (user_id, street, city, state, zip_code, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, user_id, street, city, state, zip_code, country, created_at;
    `;

    const values = [
      userId,
      street,
      city,
      state || null,
      zipCode || null,
      country || 'USA'
    ];

    const res = await client.query(query, values);

    console.log("✅ Address inserted:", res.rows[0]);
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

// Example usage:
// Make sure the user with id=1 exists in users table
insertAddress(3, "123 Main St", "New York", "NY", "10001");
insertAddress(3, "456 Maple Ave", "Los Angeles", "CA", "90001", "USA");
