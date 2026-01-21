import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://postgres:root1234@localhost/joints");
    await client.connect();
    return client;
}