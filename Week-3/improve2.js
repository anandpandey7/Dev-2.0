// better code of index2,js

const express = require('express');
const zod = require('zod');
const app = express();  

app.use(express.json());

// Define Zod schema for array of numbers
const bodySchema = zod.object({
    kidneys: zod.array(zod.number())
});



app.post("/health-checkup", (req, res) => {
    const response = bodySchema.safeParse(req.body);
    
    if (!response.success) {
        return res.status(400).json({
            error: "Invalid input",
            details: response.error.issues
        });
    }
    
    res.json({
        success: true,
        data: response.data
    });
});

app.listen(3000);
console.log('Server is running on port 3000');