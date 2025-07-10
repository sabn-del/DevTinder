// const url="mongodb+srv://sabnaDev:<Sabnavv>@cluster0.xli4a9l.mongodb.net/"
// const url='mongodb+srv://sabnavv:sabna123@cluster0.xli4a9l.mongodb.net/devTinder'

const url='mongodb://sabnavv:sabna123@ac-axsihau-shard-00-00.d9lhskj.mongodb.net:27017,ac-axsihau-shard-00-01.d9lhskj.mongodb.net:27017,ac-axsihau-shard-00-02.d9lhskj.mongodb.net:27017/?ssl=true&replicaSet=atlas-a30zih-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Sabna"'


const mongoose=require('mongoose')
const connectDB= async()=>{
    await mongoose.connect(url,{
        dbName: 'DevTinder', // 🔁 Replace this with your actual DB name like 'devTinder'
      })
}
module.exports= connectDB;

// install mongodb compass
