import express from 'express';
import {createClient} from 'redis';

const app = express();
app.use(express.json());

const client = createClient();

app.post('/submit', async(req, res) =>{
    const {problemId, code, language, userId} = req.body;
    // push this to db prisma.submission.create()

    try{
        await client.lPush("problems", JSON.stringify({problemId, userId, code, language}));

        res.status(200).json({
            message: "Submission received and stored."
        })
    } catch(error){
        console.error("Redis error: ", error);
        res.status(500).json({
            message: "Failed to store submission."
        });
    }
})

async function startServer(){
    try{
        await client.connect();
        console.log("Connected to redis");
        
        app.listen(3000, ()=>{
            console.log("Server is running on port 3000 ✅");   
        });
    } catch(error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer();