const express= require('express')
const app= express();

app.use('/test',(req,res)=>{
    res.send('heloo from the user')
})

app.listen(3000,()=>{
    console.log('Server Statrted in port 3000...');
});