const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://adminX:A3ilIACvZj42uC3T@cluster0.fzbgr1d.mongodb.net/userappnew")

const User = mongoose.model('User', { name: String, email: String, password: String });

app.use(express.json());

app.post("/signup", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
        return res.status(400).send("User already exists");
    }

    const user = new User({
        name: name,
        email: username,
        password: password
    })

//   const { name, email, password } = req.body;
//   const user = new User({ name, email, password });

    user.save().then(() => console.log('User saved'));
    res.json({
        msg: "User created successfully"
    });
}); 