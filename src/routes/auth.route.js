const express= require('express');
const authRouter=express.Router()
const {validateSignUpData}= require('../utils/validation')
const User=require('../modals/user.model');
const bcrypt = require('bcrypt');

// authRouter.post('/signup',async(req,res)=>{
//     //creating new instance  of the user modal
//     console.log(req.body,'req.body=====>')
// try{

//     //validation of data
//     validateSignUpData(req)
//     //encrypting the password

//     const {firstName,lastName,emailId,password}=req.body;
//     const hashPassword=await bcrypt.hash(password,10);
//     console.log(hashPassword)
// const user=new User({firstName,
//     lastName,
//     emailId,
//     password:hashPassword})
   
//     await user.save();
//     res.send('user added successfully')
// }
// catch(err){
//     res.status(400).send('ERR:'+err.message)
// }
    
// });

// authRouter.post('/login',async(req,res)=>{
   
   
// try{

//     const {emailId,password}=req.body;
   
//     const user=await User.findOne({emailId:emailId})
   

//     if(!user){
//         throw new Error('Invalid Credntials')
//     }
//     const isPasswordValid= await user.validatePassword(password)
//     if(isPasswordValid){

//         //create a jwt token

//         const token= await user.getJwt()
       
//         //add the token to the cookie and sent back to user
//         res.cookie("token",token,{
//     expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
//   })
//         // res.send('Login Successfull');
//         res.status(200).json({data:user,message:"Login SuccessFull"})
//     }
//     else{
//         throw new Error("Invalid Crednetials")
//     }
// }
// catch(err){
//     res.status(400).send('ERROR:'+err.message)
// }
    
// })
// authRouter.post('/logout',async(req,res)=>{
//     res.cookie('token',null,{expires:new Date(Date.now())})
//     res.send('Logout SuccessFully')
// })


const authController = require('../controllers/auth.controller');


authRouter.post('/signup', authController.signup);

authRouter.post('/login', authController.login);

authRouter.post('/logout', authController.logout);

module.exports=authRouter;