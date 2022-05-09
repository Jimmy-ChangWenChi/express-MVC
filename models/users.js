const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "請輸入您的名字"],
  },
  email: {
    type: String,
    required: [true, "請輸入您的 Email"],
    lowercase: true,
    select: false,
  },
  photo: String,
},
{
    versionKey:false,
    collection:"users"
}
);

const User = mongoose.model("users", userSchema);

module.exports = User;