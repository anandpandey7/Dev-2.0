import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://admin:admin123@localhost:5432/mydb");
    await client.connect();
    return client;
}