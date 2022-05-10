const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        username:{
            type:mongoose.Schema.ObjectId,
            ref:'users'
        },
        content:{
            type:String,
            required:[true,"content 未填寫"]
        },
        createAt:{
            type:Date,
            default:Date.now,
            select:false
        },
        image:{
            type:String,
            default:''
        },
    },
    {
        versionKey:false,
        collection:"posts"
    }
)

const POST = mongoose.model("posts",schema)

module.exports = POST;
