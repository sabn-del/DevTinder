const express= require('express')
const profileRouter= express.Router();
const {Userauth}= require('../middlewares/auth.middleware');
const { validateEditData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const {handlePasswordUpdate}=require('../controllers/profile.controller')

const viewProfileController= require('../controllers/profile.controller')


console.log(typeof validateEditData,'typeofvalidatedata');
profileRouter.get('/profile/view',Userauth,viewProfileController.viewProfile )



profileRouter.patch('/profile/edit',Userauth,viewProfileController.editProfile)



// profileRouter.patch('/profile/passwordEdit',Userauth,async(req,res)=>{
// const{emailId,password,newPassword}=req.body;
// const user=req.user
// if(user.emailId !== emailId){
//     throw new Error("User Not exist")
// }
// const isMatch= await bcrypt.compare(password,user.password)
// if(!isMatch)return res.status(400).json({ message: "Old password is incorrect" });

// user.password = await bcrypt.hash(newPassword, 10);
// await user.save();
//   res.json({ message: "Password updated successfully" });
// })
profileRouter.patch('/profile/passwordEdit', Userauth, handlePasswordUpdate);
module.exports=profileRouter;