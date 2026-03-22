import express, { Request, Response } from "express";
import {BACKEND_URL} from "@repo/common/config"

const app = express();

app.use(express.json());

console.log(BACKEND_URL);

app.get('/',(req: Request, res: Response)=>{
    try{
        res.status(200).json({
            success: "true",
            message: "hello from express"
        })
    }catch(err: any){
        res.status(500).json({
            success: "false",
            message: "Internal server error"
        })
    }
})

app.listen(3003,()=>{
    console.log("Server is running ✅");
})