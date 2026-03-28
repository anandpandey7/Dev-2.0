"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import crypto from "crypto";

export async function createOnRampTransaction(amount: number, provider: string) {
    try{
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return {
                message: "User not logged in"
            };
        }
        
        const token = crypto.randomUUID();
        const userId = session.user.id;
        
        await prisma.onRampTransaction.create({
            data: {
                userId: Number(userId),
                amount: amount,
                status: "Processing",
                startTime: new Date(),
                token: token,
                provider,
            }
        })

        return {
            message: "on ramp transaction added"
        }
    }catch (error) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong"
        };
    }
}