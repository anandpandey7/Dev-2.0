const express = require('express');
const { userMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", userMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
        return res.status(404).json({ error: "Account not found" });
    }
    res.json({ balance: account.balance });
});

router.post("/transfer", userMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: "Recipient account not found" });
        }

        // If user tries to transfer to itself
        if(toAccount.userId.toString() === req.userId) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: "Cannot transfer to the same account" });
        }

        //now perform transfer

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        // account.balance -= amount;
        // toAccount.balance += amount;

        // await account.save({ session });
        // await toAccount.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: "Transfer failed" });
    }
});

module.exports = router;