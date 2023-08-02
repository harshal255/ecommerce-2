// create token and saving in cookie
const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken();
    // option for cookie
    const option = {
        expire:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*1000
        ),
        httpOnly:true,
    };

    res.status(statusCode).cookie("tokenjwt",token,option).json({
        success:true,
        user,
        token,
    });

}

module.exports = sendToken;