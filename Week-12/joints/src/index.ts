// import { getClient } from "./utils.js";

// async function createTable() {
//     const createUserTableQuery = `
//         CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
//         );
//     `;

//     const client = await getClient();

//     try {
//         await client.query(createUserTableQuery);
//         console.log("Table created successfully!");
//     } catch (err) {
//         console.error("Error creating table:", err);
//     } finally {
//         await client.end();
//     }
// }

// createTable();


import { getClient } from "./utils.js";

async function createTables() {
  const client = await getClient();

  try {
    // 1️⃣ Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Users table created");

    // 2️⃣ Create address table
    await client.query(`
      CREATE TABLE IF NOT EXISTS address (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100),
        zip_code VARCHAR(20),
        country VARCHAR(100) DEFAULT 'USA',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `);

    console.log("✅ Address table created");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    await client.end();
  }
}

createTables();
