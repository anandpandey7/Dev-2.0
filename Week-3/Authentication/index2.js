const express = require("express");
const app = express();

function ticketChecker(req,res,next){
    const ticket = req.query.ticket;
    if(ticket === "free"){
        next();
    }else{
        res.status(403).send("Access Denied");
    }
}

app.use(ticketChecker);

app.get('/ride1', (req,res)=>{
    res.send("Welcome to Ride 1");
});

app.get('/ride2', (req,res)=>{
    res.send("Welcome to Ride 2");
});

app.get('/ride3', (req,res)=>{
    res.send("Welcome to Ride 3");
});

app.listen(3000);
console.log("Server started on port 3000");
