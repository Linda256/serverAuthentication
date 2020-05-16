const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const passport = require('passport')

function tokenForUser(user){
    const timestamp = new Date().getTime();
    const token = jwt.encode({sub:user.id, iat:timestamp},config.jwtSecret);
    //key is defined by jwt-simple, sub means subject, iat means issue at time
    return token;
}

function getUserId(token){
    return jwt.decode(token, config.jwtSecret);
}

// exports.signin = (req,res,next)=>{
//     res.send({"signin token":tokenForUser(req.user)})

// }
exports.signin = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ ...info, errorMessage: err });
      if (!user) return res.status(402).json(info)
      
      res.status(200).json({ token: tokenForUser(user) });
    })(req, res, next);
  };


exports.signup = (req,res,next)=>{
    //res.send({success:'true'})
    console.log("req.body", req.body)
    const email=req.body.email;
    const password = req.body.password;
    if(!email || !password){
        return res.status(422).send({error:"You must provide email and password!"})
    }
    


 
//check if the email is already in database
   User.findOne({email}, (err, existingUser)=>{
       if(err){
           return next(err);
       }
        console.log("existing user", existingUser);
        //if yes redirect to login page, render error msg, email already exist
        if(existingUser){
            //console.log("user is already exist!!")
            return res.status(422).send({"error":"Email is in use"})
        }
        // if not,save the user to database. direct to home page
        const newUser = new User({email,password})
        newUser.save()
            .then(user=>{
                console.log("use", user);
                const token = tokenForUser(user)
                console.log("decode token", getUserId(token));
                res.json({token})
            })
            .catch(err=>{
                console.error(err)
                return next(err);
            })
        
        
    });

    // exports.signin = (req,res,next)=>{
    //     //res.send({success:'true'})
    //     console.log("req.body", req.body)
    //     const email=req.body.email;
    //     const password = req.body.password;
    //     if(!email || !password){
    //         return res.status(422).send({error:"You must provide email and password!"})
    //     }
     
    // //check if the email is already in database
    //    User.findOne({email}, (err, existingUser)=>{
    //        if(err){
    //            return next(err);
    //        }
    //         console.log("existing user", existingUser);
    //         //if yes redirect to login page, render error msg, email already exist
    //         if(existingUser){
    //             //check password
    //             //console.log("user is already exist!!")
    //             //return res.status(422).send({"error":"Email is in use"})
    //             const token = tokenForUser(existingUser)
    //             //console.log("decode token", getUserId(token));
    //             res.json({token})
    //         }else{

    //         }
    //         // if not,save the user to database. direct to home page
    //         const newUser = new User({email,password})
    //         newUser.save()
    //             .then(user=>{
    //                 console.log("use", user);
    //                 const token = tokenForUser(user)
    //                 console.log("decode token", getUserId(token));
    //                 res.json({token})
    //             })
    //             .catch(err=>{
    //                 console.error(err)
    //                 return next(err);
    //             })
            
            
    //     });
    exports.editProfile=function(req,res,next){
        const email=req.body.email;
        const password = req.body.password;
        if(!email || !password){
            return res.status(422).send({error:"You must provide email and password!"})
        }

        // User.findOne({email}){

        // }
    }
/**
 * can use call back in newUser.save()
        newUser.save(err=>{
            if(err) {return next(err)}
            res.json({success:true});
        })
 */

/*
**************
if save without checking the user existing or not,
mongo will throw error:
"MongoError: E11000 duplicate key error collection: 
auth.users index: email_1 dup key: { email: "Lee11@hotmail.com" }"

    const newUser = new User({email,password})
    newUser.save()
            .then(doc=>{
                console.log("doc", doc)
            })
            .catch(err=>{
                console.error(err)
            })
*************
*/

/*
********************
use .then
User.findOne({email})
.then(user=>{
    console.log("user", user)
    if(user){
        console.log("email is existing")
    }else{
        const newUser = new User({email, password})
        newUser.save().then(doc=>console.log("doc", doc))
    }
})
.catch(err=>{
    console.log("err", err)
})
**********************
*/
//Respond to request indicated user is created
   //res.send(req.body)

    
    //mongoose.findOne({email:req.body.email})

    
    

}