const express = require("express");
const router = express.Router();
const error = require("../Handlers/errorHandle")
const success = require("../Handlers/successHandle");
const POST = require("../models/posts")
const Header = require("../Header/Headers");

router.get("/", async (req,res)=>{
    const allPosts = await POST.find();
    res.status(200).json({
        "status":"success",
        "message":"Search done",
        allPosts
    })
})

router.delete("/", async (req,res)=>{
    const allPosts = await POST.deleteMany({})
    res.status(200).json({
        "status":"success",
        "message":"Delete done",
        allPosts
    })
})

router.post("/",async (req,res)=>{
    try{
        const data = req.body;
        if(data.name !== undefined || data.tags !== undefined || data.content !== undefined){
            const newPost = await POST.create(data);
            res.status(200).json({
                "status":"success",
                "message":"Create done",
                newPost
            })
        }else{
            res.status(400).json({
                "status":"false",
                "message":"欄位有誤",
            })
        }
    }catch(err){
        res.status(200).json({
            "status":"false",
            "message":err,
        })
    }
})

router.patch("/:id", async (req,res)=>{
    const id = req.params.id;
    let data = req.body;
    if(data.name !== undefined || data.tags !== undefined || data.content !== undefined){
        const editPost = await POST.findByIdAndUpdate(data);
        res.status(200).json({
            "status":"success",
            "message":"update done",
            editPost
        })
    }else{
        res.status(400).json({
            "status":"false",
            "message":"欄位有誤",
        })
    }
})

module.exports = router;

// const router = async function (req, res) {
//     let body = "";
//     req.on("data", chuck => {
//         body += chuck;
//     })

//     if (req.url == "/posts" && req.method == "GET") {
//         req.body.name
//         const allPosts = await POST.find();

//         success(res, allPosts, "全部資料");
//     } else if (req.url == "/posts" && req.method == "POST") {
//         req.on("end", async () => {
//             try {
//                 const data = JSON.parse(body);

//                 if (data !== undefined) {
//                     const newPost = await POST.create(
//                         {
//                             name: data.name,
//                             tags: data.tags,
//                             content: data.content,
//                             createAt: data.createAt,
//                             likes: data.likes
//                         }
//                     )

//                     success(res, newPost, "新增成功");
//                 } else {
//                     error(res, "data error")
//                 }
//             } catch (error) {
//                 error(res, error);
//             }
//         })
//     } else if (req.url == "/posts" && req.method == "DELETE") {
//         const allPosts = await POST.deleteMany({})
//         success(res, allPosts, "全部刪除成功");

//     } else if (req.url == "/posts" && req.method == "OPTIONS") {
//         const allPosts = await POST.find()
//         success(res, allPosts, "OPTION")
//     } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
//         req.on("end", async () => {
//             try {
//                 const data = JSON.parse(body);
//                 console.log(data);
//                 const id = req.url.split("/").pop();
//                 console.log(id)
//                 if (data !== undefined) {
//                     await POST.findByIdAndUpdate(id, data);
//                     const allPosts = await POST.find();
//                     console.log("測試")
//                     success(res, allPosts, "更新成功");
//                 }else{
//                     error(res,"更新失敗")
//                 }
//             } catch (err) {
//                 error(res, "資料錯誤")
//             }
//         })
//     } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
//         const id = req.url.split("/").pop();
//         await POST.findByIdAndDelete(id)
//         const allPosts = await POST.find();
//         success(res, allPosts, "單筆刪除成功");
//     } else {
//         error(res, "找不到路由");
//     }
// }