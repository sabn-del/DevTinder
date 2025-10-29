const express= require('express');
const { Userauth } = require('../middlewares/auth.middleware');
const  paymentRouter= express.Router();
const razorpayInstence= require('../utils/razorpay');
const Payment = require('../modals/payment.model') 
const {memberShipAmount}= require("../utils/constants");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const userModel = require('../modals/user.model');
paymentRouter.post('/payment/create',Userauth, async (req,res)=>{

  const{memberShipType}=req.body;
  const{firstName,lastName,emailId}=req.user

  console.log(req.user,'user...')
    try{
const order= await  razorpayInstence.orders.create({
    amount: memberShipAmount[memberShipType]*100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  receipt: "order_rcptid_11",
  notes:{
    firstName,
    lastName,
    emailId,
    memberShipType //razorpay return the promise
  },
  
})  
//save the order in database

const payment= new Payment ({
    userId: req.user._id,
    orderId:order.id,
    status:order.status,
    amount:order.amount,
    currency:order.currency,
    receipt:order.receipt,
    notes:order.notes

})
console.log(payment,"payment....")
const savedPayment= await payment.save();


  // return back order details in frontend 
  res.json({...savedPayment.toJSON(),keyId:process.env.RAZORPAY_KEY_ID})
    }
    catch(err){
        console.log(err)
    }

});

paymentRouter.post('/payment/webhook',Userauth,async(req,res)=>{
  try{
const webhookSignature= req.get("X-Razorpay-Signature");

 const isWebHookValid=validateWebhookSignature(
  
  JSON.stringify(req.body),
  webhookSignature,
  process.env.RAZORPAY_WEBHOOK_SIGNATURE
)
if(!isWebHookValid){
   return res.status(500).json({msg:"Webhook Sugnature is Invalid"})
}

//update the payment status in db 
// make user premium
// return success response to razor pay

const paymentDetails= req.body.payload.payment.entity
const payment= await Payment.findOne({orderId:paymentDetails.order_id})
payment.status=paymentDetails.status
 await payment.save();

 const user= await User.findOne({_id:payment.userId});
 user.isPremium=true;
 user.memberShipType=payment.notes.memberShipType

 await user.save();

// if(req.body.event =='payment.captured'){

// }
// if(req.body.event =='payment.failed'){
  
// }
  }
  catch(err){
    return res.status(500).json({msg:err.message})

  }


});

paymentRouter.get('/payment/verify',Userauth,async(req,res)=>{
  try{
const user= req.user;
if(user.isPremium){
  return res.json({isPremium:true})
}else{
  return res.json({ispPremium:false})
}
    
  }
  catch(err){
console.log(err)
  }
})



module.exports=paymentRouter;