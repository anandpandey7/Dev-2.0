import { getClient } from "./utils.js";

async function joinTables() {
  const client = await getClient();

  try {
    const res = await client.query(`
      SELECT 
        u.id AS user_id,
        u.username,
        u.email,
        u.created_at AS user_created_at,
        a.id AS address_id,
        a.street,
        a.city,
        a.state,
        a.zip_code,
        a.country,
        a.created_at AS address_created_at
      FROM users u
      INNER JOIN address a
        ON u.id = a.user_id;
    `);

    console.log("✅ Joined tables result:");
    console.table(res.rows);
  } catch (err) {
    console.error("❌ Error joining tables:", err);
  } finally {
    await client.end();
  }
}

// Call the function
joinTables();
