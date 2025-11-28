// create middleware to find the Average response time of all requests made to the server

const express = require('express'); 
const app = express();

let totalResponseTime = 0;
let requestCount = 0;

// Middleware function to calculate average response time
function averageResponseTimeMiddleware(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        totalResponseTime += duration;
        requestCount++;
        
        const averageResponseTime = totalResponseTime / requestCount;
        console.log(`Request #${requestCount} took ${duration}ms | Average Response Time: ${averageResponseTime.toFixed(2)}ms`);
    });
    
    next();
}

app.use(averageResponseTimeMiddleware);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/', (req, res) => {
    res.send('POST request received');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
