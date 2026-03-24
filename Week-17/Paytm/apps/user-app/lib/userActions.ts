"use server";

import { prisma } from "@repo/db";

export async function createUserWithEmail(email: string, name: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    console.log("User created:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
