/*
****** Method 1 *******************
router.js
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>res.send("Hello"));

module.exports={router};

***************
 index.js

 const {router} = require('./router')
 app.use(router)
 */

//  module.exports = function(app){
//      app.get('/', (req,res)=>res.send("Hello"));
//  }

const Authentication = require('./controllers/authentications')

 module.exports = (app)=>{
    // app.get('/', (req,res,next)=>{
    //     res.send("Hello");
    //     next();

    // });
    app.post('/signup', Authentication.signup);
    //app.post('/editProfile', Authentication.editProfile);
}
