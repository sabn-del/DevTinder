const ConnectionRequest = require('../modals/connectionRequest.model');
const User = require('../modals/user.model');

const USER_SAFE_DATA = 'firstName lastName age gender about skills photoUrl';

const fetchReceivedRequests = async (loggedInUser) => {
  return await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: 'interested'
  }).populate('fromUserId', 'firstName lastName about skills photoUrl');
};

const fetchConnections = async (loggedInUser) => {
  const connections = await ConnectionRequest.find({
    $or: [
      { fromUserId: loggedInUser._id, status: 'accepted' },
      { toUserId: loggedInUser._id, status: 'accepted' }
    ]
  })
    .populate('fromUserId', 'firstName lastName about skills photoUrl')
    .populate('toUserId', 'firstName lastName about skills photoUrl');

  return connections.map((row) => {
    if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });
};

const fetchUserFeed = async (loggedInUser, page, limit) => {
  const cappedLimit = Math.min(limit, 50);
  const skip = (page - 1) * cappedLimit;

  const requests = await ConnectionRequest.find({
    $or: [
      { fromUserId: loggedInUser._id },
      { toUserId: loggedInUser._id }
    ]
  }).select('fromUserId toUserId');

  const hideUsersFromFeed = new Set();
  requests.forEach((req) => {
    hideUsersFromFeed.add(req.fromUserId.toString());
    hideUsersFromFeed.add(req.toUserId.toString());
  });

  return await User.find({
    _id: { $nin: [...hideUsersFromFeed, loggedInUser._id.toString()] }
  })
    .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(cappedLimit);
};

module.exports = {
  fetchReceivedRequests,
  fetchConnections,
  fetchUserFeed
};
