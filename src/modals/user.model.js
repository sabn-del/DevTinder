const mongoose= require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        index:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address "+value)
            }
        }

    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:100,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password "+value)
            }
        }

    },
    age:{
        type:Number,
        min:18,
        minLength:2
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","Female","other"].includes(value)){
      throw new Error('Gender data is nit valid')
            }
        }
    },
    about:{
        type:String,
        default:'This is Default about as',
        minLength:10,
        maxLength:30
    },
    skills:{
        type:[String]
    },
    photoUrl:{
        type:String,default: "https://geographyandyou.com/images/user-profile.png",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Url "+value)
            }
        }
    },
    isPremium:{
type:Boolean,
default:false,
    },
    memberShipType:{
        type:String,
        
    },
lastSeen: { type: Date, default: Date.now }

   

},
{
    timestamps:true
}
)

userSchema.methods.getJwt= async function(){
    user=this//this will represent the perticular instance
    const token= await jwt.sign({_id:user._id},'Dev@Tinder$120',{expiresIn:"7d"})// hide the user id and add a secret key
        return token;   
};
userSchema.methods.validatePassword= async function(passwordInputByUSer){
    user=this
    const passwordHash=user.password
    const isPasswordValid= bcrypt.compare(passwordInputByUSer,passwordHash)
    return  isPasswordValid;
}

module.exports=mongoose.model('User',userSchema)// create the model