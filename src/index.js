const express = require('express');

const auth = require('./auth.js');

const app = express();
app.use(express.json());
const port = 3000;

app.post('/funcionarios', auth.token, (req, res) => {
    const {}
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});