const viewProfile =(requestUser)=>{
 return requestUser;
}
const updateProfile= async (user,updatedFields)=>{
Object.keys(updatedFields).forEach(key => {
    user[key] = updatedFields[key];
  });
  await user.save();
  return user;
}

const updatePassword = async (user, emailId, oldPassword, newPassword) => {
  if (user.emailId !== emailId) {
    throw new Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password updated successfully" };
};

module.exports={
    viewProfile,
    updateProfile,
    updatePassword
}