import express from "express";
import cookieParser from "cookie-parser"; // parses a very long cookie string and gets you an object
import cors from "cors";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = "1234#"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));


app.post('/signin',(req,res)=>{
    try{
        const { password, email } = req.body;

        const token = jwt.sign({
            id:1
        },JWT_SECRET,
        {
            expiresIn: "1d",
        })
        res.cookie("token",token); // will put cookie, in the set-cookie header
        res.status(201).json({
            success: true,
            message: "Logged in!"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Something went wrong"
        })
    }
});

app.get("/user", (req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }

        const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;

        res.status(200).json({
            success: true,
            userId: decode.id
        })
    }
    catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

app.post("/logout",(req,res)=>{
    try{
        res.clearCookie("token");
        // res.cookie("token","");
        res.status(200).json({
            success: true,
            message: "Logged Out!"
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../src/index.html"))
})

app.listen(3000,()=>{
    console.log("Server is running ✅");
});

