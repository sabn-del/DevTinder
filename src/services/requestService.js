// services/requestService.js
const ConnectionRequest = require("../modals/connectionRequest.model");
const User = require("../modals/user.model");


const allowedSendStatus = ["ignore", "interested"];
const allowedReceiveStatus = ["accepted", "rejected"];

const sendConnectionRequest = async (fromUserId, toUserId, status,loggedInUser) => {
  if (!allowedSendStatus.includes(status)) {
    throw new Error("Not valid status");
  }

  const existingRequest = await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });

  if (existingRequest) {
    throw new Error("Connection Request already exists");
  }

  const toUser = await User.findById(toUserId);
  if (!toUser) {
    throw new Error("User not found");
  }

  const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  });

  const data = await connectionRequest.save();
  return { message: `${loggedInUser} is ${status} in ${toUser.firstName}`, data };
};

const reviewConnectionRequest = async (loggedInUser, requestId, status) => {
  if (!allowedReceiveStatus.includes(status)) {
    throw new Error("Status not allowed");
  }

  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: loggedInUser._id,
    status: "interested",
  });
console.log(connectionRequest,'connectionRequest')
  if (!connectionRequest) {
    throw new Error("Request not found");
  }

  connectionRequest.status = status;
  const data = await connectionRequest.save();
  return { message: `Connection Request ${status}`, data };
};

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
};
