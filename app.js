const express = require('express');//import express
const appln = express();

const bodyParser = require('body-parser');//import bp
const cors = require('cors');//import cors
require('dotenv').config();//dotenvv cofiguration

const user = require('./user/num_verify');//import verification router file

const database = require('./database/db');//mongoose connection

const mogoose = require('mongoose');
appln.use(express.json());
appln.use('/user',user);
port = process.env.port;

appln.listen(port, ()=>{
    console.log(`servet created at ${port}`);
})