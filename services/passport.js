const passport = require('passport');
const  JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');
const config = require('../config');
const ExtractJwt=require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs')

//Create local strategy

//1. setup options for local strategy
const localOptions={
    usernameField:"email",    
}
const localLogin = new LocalStrategy(localOptions, function(email,password,done){
    User.findOne({email}, function(err,user){
        if(err){
            return done(err)
        }
        if(!user){
            done(null, false, { message: 'User does not exist' })
        }else{
            //compare password match or not
            //if match, call done with user
            //if not, call done with user null
            user.comparePassword(password,function(err,isMatch){
                if(err){
                    return done(err)
                }
                if(!isMatch){
                    return done(null, false, { message: 'Password is wrong' })
                }
                return done(null, user)
            })

        }
    })

})

//Setup options for JWT Strategy
/*
jwt can be in request body, header, or url, 
in our case, it is request, 
so we set jwtFromRequest to tell the strategy look at 
token fromHeader and the key is 'authorization
*/

const jwtOptions ={
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwtSecret
}

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //See if the user ID in the payload exists in our database
    //If it does, call 'done' with that user object
    //otherwise, call done without a user object
    User.findById(payload.sub, function(err, user){
        if(err){
            return done(err,false)
        }
        if(user){
            return done(null,user)
        }else{
            done(null,false)
        }
        

    })

})
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin)