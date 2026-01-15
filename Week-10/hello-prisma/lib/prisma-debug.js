import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
    adapter,
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});
// ✅ Listen to query events
prisma.$on("query", (e) => {
    console.log("----- PRISMA QUERY -----");
    console.log(e.query);
    console.log("params:", e.params);
    console.log("duration:", `${e.duration}ms`);
    console.log("------------------------");
});
export { prisma };
