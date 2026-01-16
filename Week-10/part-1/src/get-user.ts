import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://postgres:root1234@localhost:5432/temp2"
});

async function getUser(email: string) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  const res = await client.query(query, values);
  return res.rows[0] || null;
}

(async () => {
  try {
    await client.connect();
    const user = await getUser('user3@gmail.com');
    if (user) console.log('User Found:', user);
    else console.log('No user found');
  } catch (err) {
    console.error('DB error:', err);
  } finally {
    await client.end();
  }
})();