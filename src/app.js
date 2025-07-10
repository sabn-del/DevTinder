const express= require('express');
const User=require('./modals/user');
const {validateSignUpData}= require('./utils/validation')

const connectDB=require('./config/database')
const app= express();
app.use(express.json())// middlware to parse json body
const bcrypt = require('bcrypt');
app.post('/signup',async(req,res)=>{
    //creating new instance  of the user modal
    console.log(req.body,'req.body=====>')
try{

    //validation of data
    validateSignUpData(req)
    //encrypting the password

    const {firstName,lastName,emailId,password}=req.body;
    const hashPassword=await bcrypt.hash(password,10);
    console.log(hashPassword)
const user=new User({firstName,
    lastName,
    emailId,
    password:hashPassword})
    console.log(user,'user=====>')
    await user.save();
    res.send('user added successfully')
}
catch(err){
    res.status(400).send('ERR:'+err.message)
}
    
})
// login api
app.post('/login',async(req,res)=>{
    //creating new instance  of the user modal
    console.log(req.body,'req.body=====>')
try{

    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId})

    if(!user){
        throw new Error('Invalid Credntials')
    }
    const isPasswordValid= bcrypt.compare(password.user.password)
    if(isPasswordValid){
        res.send('Login Successfull')
    }
    else{
        throw new Error("Invalid Crednetials")
    }
}
catch(err){
    res.status(400).send('ERR:'+err.message)
}
    
})



// get api for one user

app.get('/user',async(req,res)=>{
    const userEmail= req.body.emailId
    try{
const users=  await User.find({emailId:userEmail})

if(users.length ===0){
    res.status(404).send('something went wrong')
}
else{
res.send(users)
}
    }
    catch(err){
        res.status(400).send('Something went Wrong')
    }
    

})
// feed api or get api for all the users
app.get('/feed',async(req,res)=>{
   
    try{
const users=  await User.find({})

if(users.length ===0){
    res.status(404).send('something went wrong')
}
else{
res.send(users)
}
    }
    catch(err){
        res.status(400).send('Something went Wrong')
    }
    

})
// delete user api

// app.delete('/user',async(req,res)=>{
//     const userId= req.body.userId
//     console.log(userId,'userId')
//     try{
// const users=  await User.findByIdAndDelete(userId)


// res.send('user deleted successfully')

//     }
//     catch(err){
//         res.status(400).send('Something went Wrong')
//     }
    

// })
app.delete('/user', async (req, res) => {
    console.log(req.body, 'req.body');
    const userId = req.body.userId;
    console.log(userId, 'userId');

    try {
        const user = await User.findByIdAndDelete(userId); // ✅ pass ID directly

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send('User deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(400).send('Something went wrong');
    }
});
//update the data of user

app.patch('/user/:userId', async (req, res) => {
    
    const userId = req.params?.userId;
    const data= req.body

    try {
        const ALLOWED_FIELDS=['photoUrl','age','gender','skills','about']

        const isUpdate_Allowed= Object.keys(data).every((k)=>ALLOWED_FIELDS.includes(k))//make emailid, name, not editable, while updating

        if(!isUpdate_Allowed){
            throw new Error('Update not allowed')

        }
        if(data.skills.length>10){
            throw new Error('skills cannot be more than 10')
        }

        const user = await User.findByIdAndUpdate({_id:userId},data,{runValidators:true}); // ✅ pass ID directly
        console.log(data)
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send('User updated successfully');
    } catch (err) {
        console.error(err);
        res.status(400).send("Update Failed:"+err.message);
    }
});


connectDB().then(()=>{
    console.log('Database connection is established')
    app.listen(3000,()=>{
        console.log('Server Statrted in port 3000...');
    });
})
.catch((err)=>{

    console.log('Database cannot be connected',err.message)
})
