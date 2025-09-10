const express = require("express");
const app = express();
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 3000
const connectDB=require("./config/connectiondb")
const cors = require("cors");


app.use(express.json())
app.use(cors())
app.use(express.static("public"))


app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))
connectDB()


app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})