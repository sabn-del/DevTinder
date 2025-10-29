// controllers/requestController.js
const {
  sendConnectionRequest,
  reviewConnectionRequest,
} = require("../services/requestService");

const handleSendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { toUserId, status } = req.params;

    const result = await sendConnectionRequest(fromUserId, toUserId, status,req.user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const handleReviewConnectionRequest = async (req, res) => {
  try {
    const loggedInUser= req.user
    const { status, requestId } = req.params;
    console.log(status,requestId,'from params')
    const result = await reviewConnectionRequest(loggedInUser, requestId, status);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  handleSendConnectionRequest,
  handleReviewConnectionRequest,
};
