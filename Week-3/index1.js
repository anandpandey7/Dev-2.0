const express = require('express');

const app = express();

app.get('/health-checkup', (req, res) => {
  // do health checks here
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;

  if(username != "anand" || password != "pass"){
    res.status(403).json({
        msg: "User doesn't exist",
    });
    return;
  }

  if(kidneyId !=1 && kidneyId !=2){
    res.status(411).json({
        msg : "Wrong Input",
    });
    return;
  }

  res.send("Your Heart is healthy");

});

app.listen(3000);
console.log('Server is running on port 3000');