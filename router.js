const Authentication = require('./controllers/authentications');
require('./services/passport');
/*
we are just importing entire module (i.e. services/passport.js) 
into the scope of the module 'routes.js' (essentially copying
code from 'passport.js' and pasting it into 'routes.js')
*/
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session:false})
const requireSignin = passport.authenticate('local',{session:false})


 module.exports = (app)=>{
    // app.get('/', (req,res,next)=>{
    //     res.send("Hello");
    //     next();

    // });
    app.post('/signup', Authentication.signup);
    //app.post('/editProfile', Authentication.editProfile);
    app.get('/',requireAuth,(req,res)=>{
        res.send({hi:'there'})
    })
    //app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signin', Authentication.signin)
}

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

