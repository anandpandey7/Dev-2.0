const express = require('express');
const app = express();
// allow front end to access backend
const cors = require('cors');
app.use(cors());

app.get('/sum', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const sum = a + b;
    console.log(`Sum of ${a} and ${b} is ${sum}`);
    res.json({ sum: sum });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});