const userService = require('../services/userService');

const getReceivedRequests = async (req, res) => {
  try {
    const data = await userService.fetchReceivedRequests(req.user);
    res.json({ message: 'Data fetched successfully', data });
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
};

const getConnections = async (req, res) => {
  try {
    const data = await userService.fetchConnections(req.user);
    res.json({ data });
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
};

const getUserFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await userService.fetchUserFeed(req.user, page, limit);
    res.json({ data });
  } catch (err) {
    res.status(400).send('ERR: ' + err.message);
  }
};

module.exports = {
  getReceivedRequests,
  getConnections,
  getUserFeed
};
