const express= require('express');
const User=require('./modals/user.model');
const {validateSignUpData}= require('./utils/validation')
const cookieParser=require('cookie-parser')
const bcrypt = require('bcrypt');
const connectDB=require('./config/database')

const http=require('http');
const initailaizeSocket= require('./utils/socket')

require('dotenv').config()

const app= express();
const cors= require('cors')
app.use(express.json())// middlware to parse json body
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))




const authRouter= require('./routes/auth.route');
const profileRouter=require('./routes/profile.route')
const requestsRouter=require('./routes/requests.route');
const userRouter = require('./routes/user.route');
const chatRouter=require('./routes/chat.route')
const premiumRouter=require('./routes/payment.route')




app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestsRouter)
app.use('/',userRouter)
app.use('/',chatRouter)
app.use('/',premiumRouter)

const server=http.createServer(app);
initailaizeSocket(server)

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
    server.listen(process.env.PORT,()=>{
        console.log('Server Statrted in port 3000...');
    });
})
.catch((err)=>{

    console.log('Database cannot be connected',err.message)
})
