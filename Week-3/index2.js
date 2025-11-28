const express = require('express');
const zod = require('zod');
const app = express();

// Define Zod schema for array of numbers
const schema = zod.array(zod.number());

// IMPORTANT: Middleware must come BEFORE routes
app.use(express.json());

app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    
    if (!response.success) {
        res.status(411).json({
            msg: "Invalid input",
            errors: response.error.errors
        });
    } else {
        res.status(200).json({
            msg: "Valid input",
            data: response.data
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// improve code file - improve2.js