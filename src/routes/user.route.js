const express= require('express');
const { Userauth } = require('../middlewares/auth.middleware');
const ConnectionRequest = require('../modals/connectionRequest.model');
const User = require('../modals/user.model');
const userRouter= express.Router();
const userController = require('../controllers/user.controller');

//Get all the pending request for the loggedinuser
// const USER_SAFE_DATA="firstName lastName  age gender about skills photoUrl"
// userRouter.get('/user/requests/recieved',Userauth, async(req,res)=>{

//     try{
// const loggedInUser= req.user
// const connectionRequests=await ConnectionRequest.find({
//     toUserId:loggedInUser._id,
//     status:"interested"
// }).populate("fromUserId", "firstName lastName about skills");
// res.json({message:"Data fetch successfully",
//     data:connectionRequests
// })
//     }
//     catch(err){
//         res.status(400).send("ERROR:"+err.message)
//     }
// })



// get all the connections for  the user

// userRouter.get('/user/connections',Userauth,async (req,res)=>{
//     const loggedInUser= req.user;
//     const connections= await ConnectionRequest.find({
//     $or:[

//         {fromUserId:loggedInUser._id,status:"accepted"},
//          {toUserId:loggedInUser._id,status:"accepted"},

//     ]
//     }).populate("fromUserId" , "firstName lastName about skills")
// .populate("toUserId" , "firstName lastName about skills")
//     const data=connections.map((row)=>{
//         if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
//             return toUserId
//         }
//         return row.fromUserId;
//     })

//     res.json({data:data})
// })
//Gets  you the profiles of other users in the platform
//alredy send request to someone  dont want to see
// alredy connected people dont want to see
//alredy ignored the people
//loggedin card himself
// userRouter.get('/feed',Userauth,async (req,res)=>{
//     try{

//         const loggedInUser=req.user;
     
//         const page=parseInt(req.query.page) || 1
//         let limit= parseInt(req.query.limit) || 10
//         limit=limit>50?50:limit
//                const skip=(page-1)*limit
//         //find all the connection requets, if i have send or recieve
//         const connectionRequest= await ConnectionRequest.find({
//             $or:[
//                 {fromUserId:loggedInUser._id},
//                 {toUserId:loggedInUser._id}
                
//             ]
//         }).select("fromUserId toUserId")

       
// const hideUsersFromFeed=new Set();
// connectionRequest.forEach((req)=>{
//     hideUsersFromFeed.add(req.fromUserId.toString());
//     hideUsersFromFeed.add(req.toUserId.toString())
// })


// const users= await User.find({
//     $and:[
//         {_id:{$nin:Array.from(hideUsersFromFeed)}},
//         {_id:{$ne:loggedInUser._id}}
//     ]
// }).select(USER_SAFE_DATA).skip(skip).limit(limit)
// res.json({data:users})
//     }
//     catch(err){
//         res.status(400).send("ERR:"+err.message)
//     }
// })
userRouter.get('/user/requests/recieved', Userauth, userController.getReceivedRequests);
userRouter.get('/user/connections', Userauth, userController.getConnections);
userRouter.get('/feed', Userauth, userController.getUserFeed);

module.exports=userRouter