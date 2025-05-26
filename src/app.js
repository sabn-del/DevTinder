const express= require('express')
const app= express();
app.use('/test/2',(req,res)=>{
    res.send('testing sabna')
})

app.get('/user',(req,res)=>{
res.send({firstName:'sabna',lastName:'v v'})
})
app.post('/user',(req,res)=>{
    res.send('data save to db')
})
app.delete('/user',(req,res)=>{
    res.send('data deleted successfully')
})

app.use('/test',(req,res)=>{
    res.send('heloo from the user')
})

app.listen(3000,()=>{
    console.log('Server Statrted in port 3000...');
});