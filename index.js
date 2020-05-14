//Main starting point of the application
const express = require('express');

/*after node version 11, Cannot use import statement outside a module
import express from 'express';

for version 12, to use "import", you need:

1. run index.js as node --experimental-modules index.js (instead of node index.js)

2. put { "type": "module" } in your package.json 
    or using .mjs extension for your file instead of .js. (so index.js will be index.mjs)

*/

const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose')
const router = require('./router')

//DB setup
mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true, useUnifiedTopology: true  },()=>console.log("mongo db is connected!"))
//mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });
 
// const connection = mongoose.connection;
 
// connection.on("connected", function() {
//   console.log("connected to db");
// });
//
//App setup

const app = express();


app.use(morgan('combined'));
//app.use(bodyParser.json({type:'*/*'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
router(app);


//Server setup
const port = process.env.PORT || 3090;

app.listen(port,()=>{
    console.log(`app is running at port ${port}`)
})

module.exports=app;
