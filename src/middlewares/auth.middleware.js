
const jwt = require("jsonwebtoken");
const User = require('../modals/user.model');

const Userauth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
   
    if(!token){
      return res.status(401).send('Please Login')
    }
   //validate my token
    const decodeMessage = await jwt.verify(token, process.env.JWT_SECRETKEY);
    const { _id } = decodeMessage;

    const user = await User.findById(_id);
    if (!user) 
     return res.status(404).send('User Not Found');

    req.user = user;
    next();
  } catch (err) {
   return  res.status(401).send("ERROR:" + err.message);
  }
};

module.exports = { Userauth }; // ✅ matches your current import

