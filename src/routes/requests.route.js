const express= require('express')
const requestRouter= express.Router();
const {Userauth}= require('../middlewares/auth.middleware')
const ConnectionRequest=require("../modals/connectionRequest.model")
const User= require("../modals/user.model")

// requestRouter.post("/request/send/:status/:toUserId",Userauth,async (req,res)=>{

//    try{
// const  fromUserId=req.user._id
// const toUserId=req.params.toUserId
// const status=req.params.status


// const allowedStatus=["ignore","interested"]
// console.log(allowedStatus.includes(status),'status check')

// if(!allowedStatus.includes(status)){
//    return  res.status(400).send("Not valid Status")
// }
// // check the connection request alredy exist

// const checkConnectionRequest=await ConnectionRequest.findOne({
//     $or:[{
//         fromUserId,toUserId
//     },
// {fromUserId:toUserId,toUserId:fromUserId}
// ]
// })
// if(checkConnectionRequest){
//    return  res.status(400).send("Connection Request already exist"); 
// }
// const toUser= await User.findById(toUserId)


// if(!toUser){
// return res.status(404).send("User not found")
// }

// const connectionRequest=new ConnectionRequest({
//     fromUserId,
//     toUserId,
//     status
// })
// const data= await connectionRequest.save();
// console.log("Saved connection request:", data);
//  return  res.json({
//     message:req.user.firstName + "is"+ status + "in" + toUser.firstName,
//     data:data
//  })

//    }
//    catch(err){
//     res.status(400).send('ERR:'+err.message)
//    }
// })


// requestRouter.post('/request/recieve/:status/:requestId',Userauth,async(req,res)=>{
//    try{
//       const loggedInUser= req.user
//       const{status,requestId}=req.params
//       const allowedStatus=["accepted","rejected"]


// if(!allowedStatus.includes(status)){
//    return  res.status(400).json({message:"Status Not allowed"})
// }

// const connectionRequest= await ConnectionRequest.findOne({
//    _id:requestId,
//    toUserId:loggedInUser._id,
//    status:"interested"
// })

// if(!connectionRequest){
//    return res.status(400).json({message:"Request Not Found"})
// }
// connectionRequest.status=status

//  const  data=await connectionRequest.save()
//  res.json({message:"Connection Request"+status,data})
//    }
//    catch(err){
// res.status(400).send("ERRROR:"+err.message)
//    }
// })
// routes/requestRouter.js



const {
  handleSendConnectionRequest,
  handleReviewConnectionRequest,
} = require("../controllers/requests.controller");

requestRouter.post(
  "/request/send/:status/:toUserId",
  Userauth,
  handleSendConnectionRequest
);

requestRouter.post(
  "/request/receive/:status/:requestId",
  Userauth,
  handleReviewConnectionRequest
);




module.exports= requestRouter;

