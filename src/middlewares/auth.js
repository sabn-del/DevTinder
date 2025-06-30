const adminAuth=(req,res,next)=>{
    console.log('Admin auth is gettingchecked');
    const token='xyz'
    const isAdminAuthorized= token==='xyz'
    if(!isAdminAuthorized){
        res.status(401).send('Unauthorized user')
    }
    next()
}
const userAuth=(req,res,next)=>{
    console.log('user auth is gettingchecked');
    const token='xyz'
    const isAdminAuthorized= token==='xyz'
    if(!isAdminAuthorized){
        res.status(401).send('Unauthorized user')
    }
    next()
}
module.exports={
    adminAuth,
    userAuth
}