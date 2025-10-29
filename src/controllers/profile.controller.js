const { validateEditData } = require('../utils/validation');
const profileService=require('../services/profileService');
const { updatePassword } = require("../services/profileService");

const viewProfile= async(req,res)=>{
    try {
    const user = await profileService.viewProfile(req.user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send("ERR: " + err.message);
  }
}
const editProfile= async(req,res)=>{
 try {
    if (!validateEditData(req)) throw new Error("Invalid Edit request");

    const updatedUser = await profileService.updateProfile(req.user, req.body);
     return res.json({
      message: updatedUser.firstName + " updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
}

const handlePasswordUpdate = async (req, res) => {
  try {
    const { emailId, password, newPassword } = req.body;
    const user = req.user;

    const result = await updatePassword(user, emailId, password, newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports={
    viewProfile,
    editProfile,
    handlePasswordUpdate
}