import "dotenv/config";
import { Pool } from 'pg'; // You need to install the 'pg' package
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

// 1. Move configuration into a stable global variable
const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient | undefined 
};

const connectionString = `${process.env.DATABASE_URL}`;

// 2. The logic to initialize the client
const createPrismaClient = () => {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  });
};

// 3. Singleton logic: Only call createPrismaClient if global.prisma is undefined
if (globalForPrisma.prisma) {
  console.log("♻️  Prisma: Reusing existing instance (Singleton)");
} else {
  console.log("🆕 Prisma: Creating new instance");
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// 4. Save to global for the next hot-reload (development only)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}