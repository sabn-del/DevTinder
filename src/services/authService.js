const bcrypt = require('bcrypt');
const User = require('../modals/user.model');
const { validateSignUpData } = require('../utils/validation');

const signup = async (req) => {
  validateSignUpData(req);

  const { firstName, lastName, emailId, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashPassword
  });

  const savedUser= await user.save();
  const token= await savedUser.getJwt()
  return {token,savedUser};
};

const login = async (req) => {
  const { emailId, password } = req.body;

  const user = await User.findOne({ emailId });

  if (!user) throw new Error('Invalid Credentials');

  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) throw new Error('Invalid Credentials');

  const token =  await user.getJwt();
  
  console.log(token,'token from service')

  return { user, token };
};

module.exports = {
  signup,
  login
};
