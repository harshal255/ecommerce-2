const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {tokenjwt} = req.cookies;
    if(!tokenjwt){
        return next(new ErrorHandler("Please login to acess the resources",401));
    }

    const decodedData = jwt.verify(tokenjwt,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{    
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        };
        
        next();
    }
}