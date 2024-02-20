const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => {
    res.send("Hello world !");
})


app.listen(PORT, () => {
    console.log("Server is listening on: http://localhost:" + PORT);
})