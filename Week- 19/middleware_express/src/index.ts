import express, { type NextFunction, type Request, type Response } from "express";

const app = express();
app.use(express.json());


let requestCount = 0;

function middleware(req: Request, res: Response, next: NextFunction){
    if(req.url != "/favicon.ico"){
        requestCount++;
        console.log(requestCount);
    }
    next();
}

app.use(middleware);

app.get("/",(req: Request, res: Response)=>{
    res.status(200).send("Hello World")
})

app.get("/requestCount", (req: Request, res: Response)=>{
    res.status(200).json({
        requestCount
    })
})

app.listen(3000, ()=>{
    console.log("Server is running at 3000 ✅");
})