const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require('razorpay');

exports.addpayment = catchAsyncErrors(async (req,res,next)=>{
    
    let instance = new Razorpay({ key_id: process.env.RZ_KEY_ID, key_secret: process.env.RZ_KEY_SECRET })

    var options = {
        amount: (req.body.amount)*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
        if(err)
            return new ErrorHandler("Server error",500);

        res.status(200).json({
            success: true,
            order,
        });
    });
})

exports.verfiypayment = catchAsyncErrors(async (req,res,next)=>{
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var expectedSignature = Crypto.createHmac('sha256',process.env.RZ_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

    if(expectedSignature === req.body.response.razorpay_signature){
        res.status(200).json({
            success: true,
            message: "Valid payment"
        });
    }
    else
        return new ErrorHandler("Inavlid payment",500);
   
})