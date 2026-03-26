import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import db from "@repo/db/client";

const app = express();

app.use(express.json());


const paymentSchema = z.object({
  token: z.string().min(10),
  user_identifier: z.string(),
  amount: z.number().positive()
});


app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedData = paymentSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: parsedData.error.issues
      });
    }
    // check if tthis information actually came from hdfc bank, use a webhook secret here
    const paymentInformation = {
      token: parsedData.data.token,
      userId: parsedData.data.user_identifier,
      amount: parsedData.data.amount
    };

    await db.balance.update({
        where: {
            userId: parseInt( paymentInformation.userId )
        },
        data: {
            amount: {
                increment: paymentInformation.amount
            }
        }
    })

    await db.onRampTransaction.update({
        where: {
            token: paymentInformation.token
        },
        data: {
            status: "Success"
        }
    })

    

    return res.status(200).json({
      success: true,
      message: "Captured",
      data: paymentInformation
    });

  } catch (error : any) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
  }
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

app.listen(3003, () => {
  console.log("Server running on port 3003");
});