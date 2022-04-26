const express = require("express");
const app = express();
const postsRouter = require("./routes/posts")

app.use("/", postsRouter);


app.get("/posts/:name", (req,res) =>{
    res.rend("HTML");
})

const port = process.env.PORT || 3000;
app.listen(port);