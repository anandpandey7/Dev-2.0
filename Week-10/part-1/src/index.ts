// write a function to create a user table in your database

import { Client } from 'pg';

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'temp2',
  user: 'postgres',
  password: 'root1234',
});


async function createUsersTable() {
    await client.connect();
    const result = await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log(result);
}

createUsersTable()
    .then( ()=>{
        console.log('Success');
    })
    .catch ((e)=>{
        console.log(e);
    })
    .finally( async ()=>{
        await client.end();
    })


