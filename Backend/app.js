//imports 
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser')

//load env variables fro the .env file
dotenv.config();

connectToDb();

//initialize the express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('Hello world!')
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);

module.exports = app;