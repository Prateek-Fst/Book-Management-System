const express = require("express");
const {default:mongoose} = require("mongoose");
require("dotenv").config();
const app= express();
const route = require("./routes/route")
app.use(express.json());
mongoose
    .connect(process.env.URL)
    .then(()=>console.log("MongoDb is connected"))
    .catch((err)=>console.log(err));

    app.use("/",route);
    app.listen(process.env.PORT||8081,function(){
        console.log("App is running on port ", process.env.PORT)
    })


