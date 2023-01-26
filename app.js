require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const path = require("path");
const cookieParser = require("cookie-parser");
const { callHandler } = require('./Controller/callController');
app.use(cors())

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.post("/call", callHandler)
app.get("/connect", (req, res) => {
  res.render("call.ejs");
})

let port = process.env.PORT || 3000
app.listen(port, function () {
  console.log("server started at port 3000");
});
