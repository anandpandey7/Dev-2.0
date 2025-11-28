//creating middleware to count no of requests made to the server

const express = require('express'); 
const app = express();


let requestCount = 0;

// Middleware function to count requests
function countRequests(req, res, next) {
    requestCount++;
    console.log(`Request Count: ${requestCount}`);
    next();
}
app.use(countRequests);
// it means MIDDLEWARE WILL BE APPLIED TO ALL THE ROUTES

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/', (req, res) => {
    res.send('POST request received');
});

// apply global catch-all error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});