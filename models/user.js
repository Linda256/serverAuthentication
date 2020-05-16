const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

//Define our model
const userSchema = new Schema({
    email: {
        type: String, //javascript String
        unique: true,
        required:true,
        lowerCase:true //mongo is case sensetive linda@hotmail.com !== Linda@hotmail.com
    }, 
    password: {type:String, required:true}
})

//On Save hook, encrypt password

//Before saving a model, run this function
userSchema.pre('save', function(next){
    //get access to the user
    const user = this;

    //generate a salt then run call back
    //to avoid hash the password for the user who is already exist, 
    //check the password propery it in database before hash.
    /**
     * Todo
     */
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
        if(err){return next(err)}

        //hash (encrypt) out password using salt
        bcrypt.hash(user.password, salt,null,function(err,hash){
            if(err){return next(err)};

            //overwrite plain text with the hash(encrypt password)
            user.password=hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword,callback){
  bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    if(err){
      return callback(err)
    }
    callback(null, isMatch)
  })
}

//Create the model class
const modelClass = mongoose.model('user',userSchema);

//Export the model
module.exports = modelClass

/**
 * ************************
 * use async and await, bcryptjs
 const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
 
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  }
})
 
// user instance hook
userSchema.pre('save', async function (next) {
  const user = this
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
  } catch (err) {
    return next(err)
  }
})
 
exports = module.exports = mongoose.model('User', userSchema)
 * ************************
 */