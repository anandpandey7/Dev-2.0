const express = require('express');
const app = express();

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
},1000);

app.use((req,res,next)=>{
    const userId = req.headers["user-id"];
    if(numberOfRequestsForUser[userId]){
        numberOfRequestsForUser[userId]++;
        if(numberOfRequestsForUser[userId] > 5){
            res.status(429).send("Too many requests - try again later");
        }else{
            next();
        }
    }else{
        numberOfRequestsForUser[userId] = 1;
        next();
    }
});

app.listen(3000);