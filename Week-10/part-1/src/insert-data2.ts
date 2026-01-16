// safe way to insert data
import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://postgres:root1234@localhost:5432/temp2"
});

async function insertData(username: string, email: string, password: string ) {
    // using parameterized query to prevent SQL Injection
    await client.connect();
    const insertQuery = `INSERT INTO users (username, email, password) VALUES($1, $2, $3)`;
    const values = [username, email, password ];

    const res = await client.query(insertQuery, values);
    console.log('Insertioin success', res);
}

insertData('username3', 'user3@gmail.com', 'user_password')
    .then(()=>{
        console.log("success");
    })
    .catch((e)=>{
        console.log(e);
    }) 
    .finally(async ()=>{
        await client.end();
    })
