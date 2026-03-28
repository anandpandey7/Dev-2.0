import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

// Zod schema to validate webhook input
const webhookSchema = z.object({
  token: z.string().uuid(),
  user_identifier: z.number().int().positive(),
  amount: z.string(),
});

app.post("/hdfcWebhook", async (req, res) => {
  // 1️⃣ Validate request body
  const parseResult = webhookSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: parseResult.error.issues,
    });
  }

  const { token, user_identifier, amount } = parseResult.data;

  try {
    // 2️⃣ Atomic transaction: update transaction + balance
    const transactionResult = await db.$transaction(async (tx) => {
      // Update transaction status ONLY if it's still Processing
      const txnUpdate = await tx.onRampTransaction.updateMany({
        where: { token, status: "Processing" },
        data: { status: "Success" },
      });

      if (txnUpdate.count === 0) {
        // Transaction was already processed → idempotent behavior
        return { alreadyProcessed: true };
      }

      // Update user balance
      await tx.balance.update({
        where: { userId: user_identifier },
        data: {
          amount: {
            increment: Number(amount),
          },
        },
      });

      return { alreadyProcessed: false };
    });

    if (transactionResult.alreadyProcessed) {
      return res.json({ message: "Transaction already processed, no duplicate credit" });
    }

    res.json({ message: "Transaction captured successfully" });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3003, () => {
  console.log("Webhook server running on port 3003");
});




// import express from "express";
// import db from "@repo/db/client";
// const app = express();

// app.use(express.json())

// app.post("/hdfcWebhook", async (req, res) => {
//     //TODO: Add zod validation here?
//     //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
//     const paymentInformation: {
//         token: string;
//         userId: Number;
//         amount: string;
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount
//     };

//     try {
//         await db.$transaction([
//             db.balance.updateMany({
//                 where: {
//                     userId: Number(paymentInformation.userId)
//                 },
//                 data: {
//                     amount: {
//                         // You can also get this from your DB
//                         increment: Number(paymentInformation.amount)
//                     }
//                 }
//             }),
//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token
//                 }, 
//                 data: {
//                     status: "Success",
//                 }
//             })
//         ]);

//         res.json({
//             message: "Captured"
//         })
//     } catch(e: any) {
//         console.error(e);
//         res.status(411).json({
//             message: e.message
//         })
//     }

// })

// app.listen(3003);