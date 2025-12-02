const jwt = require('jsonwebtoken');
const { User } = require('../db/index');
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;

    const word = token.split(' ');
    if(word.length !== 2 || word[0] !== 'Bearer'){
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    const userToken = word[1];

    // const userData = jwt.verify(userToken, JWT_SECRET);
    let userData;
    try {
        userData = jwt.verify(userToken, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }

    User.findOne({ username: userData.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }
            req.username = user.username;
            next();
        })
        .catch(err => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });
}

module.exports = userMiddleware;