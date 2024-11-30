//imports 
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const connectToDb = require('./db/db');

//load env variables fro the .env file
dotenv.config();

connectToDb();

//initialize the express application
const app = express();
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello world!')
})

module.exports = app;