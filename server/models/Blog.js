const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },

    slug:{
        type:String,
        unique:true
    },

    content:{
        type:String,
        required:true
    },

    category:{
        type:String,
        default:"General"
    },

    coverImage:{
        type:String,
        default:"default-blog.jpg"
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    views:{
        type:Number,
        default:0
    },

    likes:{
        type:Number,
        default:0
    },

    isPublished:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Blog", blogSchema);