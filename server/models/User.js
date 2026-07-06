const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    fullName:{
        type:String,
        required:true,
        trim:true
    },

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true
    },

    profileImage:{
        type:String,
        default:"default.png"
    },

    bio:{
        type:String,
        default:""
    },

    role:{
        type:String,
        enum:["user","admin","superadmin"],
        default:"user"
    },

    isActive:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);