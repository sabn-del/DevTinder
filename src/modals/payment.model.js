const { timeStamp } = require('console');
const mongoose= require('mongoose');
 const paymentSchema= new mongoose.Schema({
    userId:{
type:mongoose.Types.ObjectId,
ref:"User",
required:true
    },
    paymentId:{
type:String,
    },
orderId: {
     type: String, 
     required: true 
    },        // e.g. "order_RTLk6LykP8bGbD"
 
  amount: {
     type: Number,
      required: true 
    },         // in paise (e.g. 50000 = ₹500)
  
  currency: { type: String, 
    default: "INR"
 },
  status: { 
    type: String, 
    default: "created",
    required:true

   },
  receipt: { type: String },
                     // timestamp from Razorpay
  notes: {
    firstName: { type: String },
    lastName: { type: String },
    memberShipType: { type: String }
  },
 },
 {
 timestamp:true
 }
)
 module.exports= mongoose.model("Payment",paymentSchema)