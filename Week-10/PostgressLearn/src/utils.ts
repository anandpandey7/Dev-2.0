import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://neondb_owner:npg_Luh2r0OcTjMq@ep-winter-fire-adbpbfjh-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
    await client.connect();
    return client;
}