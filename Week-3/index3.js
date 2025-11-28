const express = require('express');
const zod = require('zod');
const app = express();

const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: z.literal("IN").or(z.literal("US")),
    kidneys: zod.array(zod.number())
});

app.use(express.json());

app.post("/register", (req, res) =>{
    
})