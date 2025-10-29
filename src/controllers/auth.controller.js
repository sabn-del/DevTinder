const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    const {token,savedUser} = await authService.signup(req);
   
    res.cookie('token', token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true
    });
    // res.status(200).send(response);
     res.status(200).json({ data: savedUser, message: 'User Added Successfully' });
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req);

    res.cookie('token', token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true
    });

    res.status(200).json({ data: user, message: 'Login Successful' });
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
};

const logout = (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  res.send('Logout Successfully');
};

module.exports = {
  signup,
  login,
  logout
};
