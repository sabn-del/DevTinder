const express= require('express');
const User=require('./modals/user')

const connectDB=require('./config/database')
const app= express();
app.use(express.json())// middlware

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

connectDB().then(()=>{
    console.log('Database connection is established')
    app.listen(3000,()=>{
        console.log('Server Statrted in port 3000...');
    });
})
.catch((err)=>{

    console.log('Database cannot be connected',err.message)
})
