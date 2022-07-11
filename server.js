const express = require("express");
const path = require("path");
const app = express();

const port = process.env.port || 2000;

//loadstatic
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

//load assets
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("Start to server on localhost:2000");
});
