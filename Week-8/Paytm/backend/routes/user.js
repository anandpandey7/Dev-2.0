const { Router } = require("express");
const { User } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");

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

        // Create JWT token
        const token = jwt.sign(
            { id: newUser._id},
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
router.post("/login", async (req, res) => {
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
            { id: user._id},
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

module.exports = router;
