// creating a http server
// in express js

// node default library => no 
const express = require('express');
const app = express();
const port = 3000;

const user = [{
    name : "Leando",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get('/', (req, res) => {
    const leandoKidneys = user[0].kidneys;
    const numberofKidneys = leandoKidneys.length;
    let numberofHealthyKidneys = 0;
    for (let i = 0; i < numberofKidneys; i++) {
        if (leandoKidneys[i].healthy) {
            numberofHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberofKidneys - numberofHealthyKidneys;
    res.json({
        numberofKidneys,
        numberofHealthyKidneys,
        numberOfUnhealthyKidneys
    })
});


app.post('/', (req, res) => {
    const isHealthy = req.body.healthy;
    user[0].kidneys.push({ 
        healthy: isHealthy 
    });
    res.json({
        message: "Kidney added successfully",
        kidneys: user[0].kidneys
    });
});

app.put('/', (req, res) => {
    for (let i = 0; i < user[0].kidneys.length; i++) {
        user[0].kidneys[i].healthy = true;
    }
    res.json({
        message: "All kidneys updated successfully"
    });
});

app.delete('/', (req, res) => {
    // Check if there are any unhealthy kidneys to delete
    if (user[0].kidneys.every(kidney => kidney.healthy)) {
        return res.status(411).json({
            message: "No unhealthy kidneys to delete"
        });
    }

    const newKidneys = user[0].kidneys.filter(x => x.healthy);
    user[0].kidneys = newKidneys;
    res.json({
        message: "All Unhealthy kidneys deleted successfully",
        kidneys: user[0].kidneys
    });
});

app.listen(port);