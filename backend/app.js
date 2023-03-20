const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');

const PORT = process.env.PORT;


// Middleware
const middleware = (req, res, next) => {
    console.log(`Middleware is running`);
    next();
}

app.get('/test', middleware, (req, res) => {
    res.send(`You're in test page`);
});

app.get('/contact', (req, res) => {
    res.send(`You're in contact page`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});