const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require("../models/userModel");
const sendToken = require("../utils/jwtTokens");
const sendEmail = require("../utils/sendEmail");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        }
    });

    const token = user.getJWTToken();

    sendToken(user, 201, res);
})

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (await isPasswordMatched == false) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = user.getJWTToken();

    sendToken(user, 200, res);
})

// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("tokenjwt", null, {
        expires: new Date(Date.now()),
        httponly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    // find the user
    const user = await User.findOne({ email: req.body.email });

    if (!user)
        return next(new ErrorHandler("User not found", 404));

    // get resetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it `;

    try {
        await sendEmail({
            email: user.email,
            subjet: `Ecommerce Passwod Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})

// Reset Password with crypto
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    // creating token hash
    const resetPasswordToken = Crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt:Date.now()},
    })

    if(!user)
        return next(new ErrorHandler("Reset Password Token is inalid or has been expired",400));

    if(req.body.password != req.body.confirmPassword)
        return next(new ErrorHandler("Password does not matched",400));

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // for login after reset the password
    sendToken(user,200,res);
})

// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
//     // creating token hash
//     const resetPasswordToken = crypto.SHA256(req.params.token).toString(crypto.enc.Hex);

//     const user = await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user)
//         return next(new ErrorHandler("Reset Password Token is invalid or has expired", 400));

//     if (req.body.password !== req.body.confirmPassword)
//         return next(new ErrorHandler("Password does not match", 400));

//     user.password = req.body.password;

//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     // for login after resetting the password
//     sendToken(user, 200, res);
// });


// Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// Update user Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched)
        return next(new ErrorHandler("old password is incorrect", 400));

    if (req.body.newPassword != req.body.confirmPassword)
        return next(new ErrorHandler("passwword does not matched", 400));

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

// Update Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email
    }
    // Here avatar will add....
    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Get All Users (Admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get Single User Detail (Admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return next(new ErrorHandler(`User does not exists with Id : ${req.params.id}`, 400));

    res.status(200).json({
        success: true,
        user
    })
})

// Update user role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // Here avatar will add....
    const user = await User.findByIdAndUpdate(req.params.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!user)
        return next(new ErrorHandler(`User does not exists with Id : ${req.params.id}`, 400));

    res.status(200).json({
        success: true
    })
})

// Delete user -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return next(new ErrorHandler(`User does not exists with Id : ${req.params.id}`, 400));

    await user.remove();
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})