const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();
const PORT = process.env.SERVER_PORT;

//use middleware
app.use(cors({
    origin: 'http://localhost:3000',
    method: "GET, POST, PUT, DELETE, OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.options('/*', (_, res) => {
    res.sendStatus(200);
});

app.use('/', require('./routes/index.r'));

app.listen(PORT, () => {
    console.log("Server is listening on: http://localhost:" + PORT);
})