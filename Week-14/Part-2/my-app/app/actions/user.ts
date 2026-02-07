'use server';

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface CreateUser {
    email: string,
    password: string
}


export async function signup(data: CreateUser) {
  try {
    const { email, password } = data;

    const hashedPass = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPass,
      },
    });

    return true;
  } catch (error) {
    console.error("Signup failed:", error);
    return false;
  }
}