const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");  // Import CORS package

const app = express();
const route = require("./routes/route");

// Use CORS middleware to allow all origins (you can customize this later)
app.use(cors());  // Allow all cross-origin requests

app.use(express.json());

mongoose
  .connect(process.env.URL)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 8081, function () {
  console.log("App is running on port ", process.env.PORT || 8081);
});
