const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{

try{

const {fullName,username,email,password}=req.body;

const emailExists=await User.findOne({email});

if(emailExists){

return res.status(400).json({
message:"Email already exists"
});

}

const usernameExists=await User.findOne({username});

if(usernameExists){

return res.status(400).json({
message:"Username already exists"
});

}

const salt=await bcrypt.genSalt(10);

const hashedPassword=await bcrypt.hash(password,salt);

const user=await User.create({

fullName,
username,
email,
password:hashedPassword

});

res.status(201).json({

success:true,

message:"Registration Successful",

user

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.login=async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(400).json({

message:"Invalid Credentials"

});

}

const isMatch=await bcrypt.compare(password,user.password);

if(!isMatch){

return res.status(400).json({

message:"Invalid Credentials"

});

}

const token=jwt.sign(

{

id:user._id,

role:user.role

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);

res.json({

success:true,

token,

user

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};