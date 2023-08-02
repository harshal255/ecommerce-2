const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name shold have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be more than 8 charachters"],
        select:true
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user" 
    },
    resetPasswordToken:String,  
    resetPasswordExpire:Date
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);  
})

// JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
};

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};  

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    // Generating Token
    const resetToken = Crypto.randomBytes(20).toString("hex");

    // hasing and adding resetpasswordtoken o userSchema
    this.resetPasswordToken = Crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    
    return resetToken;
}
module.exports = mongoose.model("Users",userSchema);