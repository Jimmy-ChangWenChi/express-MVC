const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:[true,"姓名未填寫"]
        },
        tags:{
            type:String,
            require:[true,"tags 未填寫"]
        },
        content:{
            type:String,
        },
        createAt:{
            type:Date,
            default:Date.now,
            select:false
        },
        likes:{
            type:Number,
            default:0
        }
    },
    {
        versionKey:false,
        collection:"posts"
    }
)

const POST = mongoose.model("posts",schema)

module.exports = POST;
