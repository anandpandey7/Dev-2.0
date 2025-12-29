import { getClient } from "./utils";

async function getUsers() {
  const client = await getClient();

  const selectUserText = 'SELECT * FROM users';
  const userRes = await client.query(selectUserText);

  console.log("Users :");
  for (let user of userRes.rows) {
    console.log(`ID: ${user.id}, Email: ${user.email}`);
  }   
}

getUsers();
