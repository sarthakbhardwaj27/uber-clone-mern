//imports 
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');

//initialize the express application
const app = express();
app.use(cors());

//load env variables fro the .env file
dotenv.config();

app.get('/',(req,res)=>{
    res.send('Hello world!')
})

module.exports = app;