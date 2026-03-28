"use server"

import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to:string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = Number(session?.user?.id);
    if(!from){
        return {
            message: "login error - user is not login"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if(!toUser){
        return {
            message: "User not found"
        }
    }

    try {
        await prisma.$transaction(async (tx) => {

            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

            // 🔒 1. Lock sender balance row
            const senderBalance = await tx.balance.findFirst({
                where: {
                    userId: from
                }
            })

            if (!senderBalance) {
                throw new Error("Sender balance not found");
            }

            

            // 💸 2. Check sufficient balance
            if (senderBalance.amount < amount) {
                throw new Error("Insufficient balance");
            }

            // ➖ 3. Deduct from sender
            await tx.balance.update({
                where: { userId: from },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            });

            // console.log("first");

            // ➕ 4. Add to receiver
            await tx.balance.upsert({
                where: { userId: toUser.id },
                update: {
                    amount: {
                        increment: amount
                    }
                },
                create: {
                    userId: toUser.id,
                    amount,
                    locked: 0
                }
            });

            // console.log("second");

            // 🧾 5. (Optional but recommended) create transfer record
            // await tx.p2pTransfer.create({ ... });
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: from,
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date()
                }
            })

        });
        // console.log("done");

        return {
            message: "Transfer successful"
        };

    } catch (e: any) {
        return {
            message: e.message
        };
    }
}