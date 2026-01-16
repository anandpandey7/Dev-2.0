import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://postgres:root1234@localhost:5432/temp2"
});

async function insertData() {
    await client.connect();

    const insertQuery = `INSERT INTO users (username, email, password)
        VALUES ('username1', 'username1@gmail.com', '123456'),
        ('username2', 'username2@gmail.com', '123456')` ;

    const res = await client.query(insertQuery);
    console.log('Insertion Success:', res.rows);
}

insertData()
    .then(()=>{
        console.log("success");
    })
    .catch((e)=>{
        console.log(e);
    })
    .finally(async ()=>{
        await client.end();
    })


