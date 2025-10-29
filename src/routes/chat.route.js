const express= require('express');
const chatRouter=express.Router();
const {Chat}= require("../modals/chat.model");
const {Userauth}=require("../middlewares/auth.middleware")

chatRouter.get("/chat/:targetUserId",Userauth,async (req,res)=>{
    const{targetUserId }= req.params;
    const userId=req.user._id
    try{
        let chat= await  Chat.findOne({
           participants:{$all:[userId,targetUserId]}
        }).populate({
            path:"messages.senderId",
            select:"firstName, lastName"
        })
       if(!chat){
chat= new Chat({
    participants:[userId,targetUserId],
    messages:[]
})
await chat.save()
       }
res.json(chat)
    }
    catch(err){
console.log(err)
    }
})
module.exports=chatRouter