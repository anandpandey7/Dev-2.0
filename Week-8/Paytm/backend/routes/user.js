const { Router } = require("express");
const { User, Account } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { userMiddleware } = require("../middleware");

// JWT secret should be stored in environment variables
const { JWT_SECRET } = require("../config");

const registerSchema = zod.object({
    username: zod.string().min(3),
    password: zod.string().min(6),
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
});

const loginSchema = zod.object({
    username: zod.string().min(3),
    password: zod.string().min(6),
});

// ---------------------- SIGNUP ----------------------
router.post("/signup", async (req, res) => {
    try {
        const parsed = registerSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: parsed.error.format(),
            });
        }

        const { username, password, firstName, lastName } = parsed.data;

        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
        });
        await newUser.save();

        // Create an account with initial random balance
        const newAccount = new Account({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        });
        await newAccount.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );


        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ---------------------- LOGIN ----------------------
router.post("/signin", async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: parsed.error.format(),
            });
        }

        const { username, password } = parsed.data;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );


        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional(),
});

router.put('/', userMiddleware, async (req, res) => {
    // 1️⃣ Validate Input
    const parsed = updateBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(411).json({ message: 'Bad Request: Invalid request body' });
    }

    try {
        // 2️⃣ Only update allowed fields (not entire req.body)
        const updateData = parsed.data;

        // 3️⃣ If password is present, hash it
        if (updateData.password) {
            const bcrypt = require('bcrypt');
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // 4️⃣ Update user in DB
        await User.updateOne(
            { _id: req.userId },
            { $set: updateData }
        );

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
