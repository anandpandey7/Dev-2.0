const jwt = require('jsonwebtoken');
const { User } = require('../db');
 // const JWT_SECRET = require('../index');
const { JWT_SECRET } = require("../config");
const { Admin } = require('../db/index');




// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    // const [bearer, adminToken] = token.split(' ');
    const words = token.split(' ');
    if (words.length !== 2 || words[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }
    const adminToken = words[1];
    // const adminData = jwt.verify(adminToken, JWT_SECRET);
    let adminData;
    try {
        adminData = jwt.verify(adminToken, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }

    Admin.findOne({ username: adminData.username })
        .then(admin => {
            if (!admin) {
                return res.status(401).json({ message: 'Unauthorized: Admin not found' });
            }
            req.admin = admin;
            next();
        })
        .catch(err => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });


}

module.exports = adminMiddleware;