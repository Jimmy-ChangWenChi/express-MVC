const http = require("http");
const mongoose = require("mongoose");
const POST = require("./models/posts");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });



const error = require("./Handlers/errorHandle");
const success = require("./Handlers/successHandle");

//設定資料庫資料
const DB = process.env.MONGODB.replace('<password>', process.env.PW);
//連線資料庫
mongoose.connect(DB)
    .then(() => {
        console.log("資料庫連線成功")
    })
    .catch((error) => {
        console.log(error);
    })
const requestListener = async function (req, res) {
    let body = "";
    req.on("data", chuck => {
        body += chuck;
    })
    // const Headers = {
    //     'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    //     'Content-Type': 'application/json'
    // }

    if (req.url == "/posts" && req.method == "GET") {
        const allPosts = await POST.find();
        //console.log(allPosts);
        // res.writeHead(200, Headers);
        // res.write(JSON.stringify({
        //     status: "success",
        //     allPosts
        // }))
        // res.end();

        success(res, allPosts, "全部資料");
    } else if (req.url == "/posts" && req.method == "POST") {
        req.on("end", async () => {
            try {
                const data = JSON.parse(body);

                if (data !== undefined) {
                    const newPost = await POST.create(
                        {
                            name: data.name,
                            tags: data.tags,
                            content: data.content,
                            createAt: data.createAt,
                            likes: data.likes
                        }
                    )

                    success(res, newPost, "新增成功");
                } else {
                    error(res, "data error")
                }
            } catch (error) {
                error(res, error);
            }
        })
    } else if (req.url == "/posts" && req.method == "DELETE") {
        const allPosts = await POST.deleteMany({})
        success(res, allPosts, "全部刪除成功");

    } else if (req.url == "/posts" && req.method == "OPTIONS") {
        const allPosts = await POST.find()
        success(res, allPosts, "OPTION")
    } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
        req.on("end", async () => {
            try {
                const data = JSON.parse(body);
                console.log(data);
                const id = req.url.split("/").pop();
                console.log(id)
                if (data !== undefined) {
                    await POST.findByIdAndUpdate(id, data);
                    const allPosts = await POST.find();
                    console.log("測試")
                    success(res, allPosts, "更新成功");
                }else{
                    error(res,"更新失敗")
                }
            } catch (err) {
                error(res, "資料錯誤")
            }
        })
    } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
        const id = req.url.split("/").pop();
        await POST.findByIdAndDelete(id)
        const allPosts = await POST.find();
        success(res, allPosts, "單筆刪除成功");
    } else {
        error(res, "找不到路由");
    }
}

//建立 server
const server = http.createServer(requestListener);

server.listen(process.env.PORT || process.env.SERVERPORT);