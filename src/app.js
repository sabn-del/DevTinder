const express= require('express');
const User=require('./modals/user')

const connectDB=require('./config/database')
const app= express();
app.use(express.json())// middlware to parse json body

app.post('/signup',async(req,res)=>{
    //creating new instance  of the user modal
    console.log(req.body,'req.body=====>')

    const user=new User(req.body)
    console.log(user,'user=====>')
    await user.save();
    res.send('user added successfully')
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

app.patch('/user', async (req, res) => {
    
    const userId = req.body.userId;
    const data= req.body

    try {
        const user = await User.findByIdAndUpdate({_id:userId},data); // ✅ pass ID directly
        console.log(data)
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send('User updated successfully');
    } catch (err) {
        console.error(err);
        res.status(400).send('Something went wrong');
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
