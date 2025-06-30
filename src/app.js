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

connectDB().then(()=>{
    console.log('Database connection is established')
    app.listen(3000,()=>{
        console.log('Server Statrted in port 3000...');
    });
})
.catch((err)=>{

    console.log('Database cannot be connected',err.message)
})
