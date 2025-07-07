const mongoose= require('mongoose');

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
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:100
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
        type:String
    }


   

},
{
    timestamps:true
}
)
module.exports=mongoose.model('User',userSchema)// create the model