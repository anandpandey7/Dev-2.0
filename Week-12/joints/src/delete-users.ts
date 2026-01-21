import { getClient } from "./utils.js";

async function deleteUser(userId: number){
    const client = await getClient();
    try{

        let delquery = `DELETE FROM users WHERE id = $1 RETURNING id, username, email;`;
        const res = await client.query(delquery, [userId]);

        if (res.rows.length === 0) {
        console.log(`⚠️ No user found with id = ${userId}`);
        } else {
        console.log("✅ User deleted:", res.rows[0]);
        }
    }
    catch(err){
        if (err instanceof Error) {
        console.error("❌ Delete error:", err.message);
        } else {
        console.error("❌ Unknown error:", err);
        }
    }finally {
    await client.end();
  }
}

deleteUser(3);