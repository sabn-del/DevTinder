const socket= require("socket.io");
const {Chat}= require("../modals/chat.model");
const User = require('../modals/user.model')
const crypto= require("crypto")
const getSecretRoomId =(userId,targetUserId)=>{
return crypto 
.createHash("sha256")
.update([userId,targetUserId].sort().join('$'))
.digest('hex')
}


const initailaizeSocket=(server)=>{
    const io= socket(server,{
    cors:{
         origin:"http://localhost:5173",
    },
})
let onlineUsers = new Map();

io.on("connection",(socket)=>{




    // Mark user online
 
// socket.on("userOnline", (userId) => {
//       onlineUsers.set(userId, socket.id);
//       io.emit("updateUserStatus", { userId, status: "online" });
//     });

    socket.on("joinChat",({firstName,userId,targetUserId})=>{

        // const roomId=[userId,targetUserId].sort().join('_');
        const roomId=getSecretRoomId(userId,targetUserId)
        console.log(firstName+"jpiningRoom"+roomId)
        socket.join(roomId)
    });


    socket.on("sendMessage", async({firstName,lastName,userId,targetUserId,text})=>{

        //   const roomId=[userId,targetUserId].sort().join('_');
        const roomId=getSecretRoomId(userId,targetUserId)
         

//TODO:check if the userId &targetUserId are friend

ConnectionRequest.findOne({fromUserId:userId, toUserId:targetUserId,status:"accepted"})


          //save the message to database

          try{
let chat= await Chat.findOne({
participants:{$all:[userId,targetUserId]}// all thepeople in the array should be the particpants of here.

})
if(!chat){
chat= new Chat({
    participants:[userId,targetUserId],
    messages:[]
})

}
chat.messages.push({
    senderId:userId,
    text
})
console.log(chat,'chat')
await chat.save();
io.to(roomId).emit("messageRecieved",{firstName,lastName,text})
          }
          catch(err){

          }
        
    });
  
   



    // socket.on("disConnect", async()=>{

    //     for (let [userId, id] of onlineUsers.entries()) {
    //     if (id === socket.id) {
    //       onlineUsers.delete(userId);

    //       const lastSeen = new Date();
    //       try {
    //         await User.findByIdAndUpdate(userId, { lastSeen });
    //       } catch (err) {
    //         console.error("Error updating lastSeen:", err);
    //       }

    //       io.emit("updateUserStatus", {
    //         userId,
    //         status: "offline",
    //         lastSeen,
    //       });

    //       break;
    //     }
    //   }
        
    // })
//     socket.on("disconnect", async () => {
//   for (let [userId, id] of onlineUsers.entries()) {
//     if (id === socket.id) {
//       onlineUsers.delete(userId);
//       const lastSeen = new Date();
//       await User.findByIdAndUpdate(userId, { lastSeen });
//       io.emit("updateUserStatus", { userId, status: "offline", lastSeen });
//       break;
//     }
//   }
// });
})
}
module.exports=initailaizeSocket;