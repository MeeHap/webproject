const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
module.exports.router = require("./router");

const port = process.env.port || 2000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//loadstatic
// app.use("/static", express.static("/views"));
app.use(express.static("public"));
app.use(express.static("views"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/router", module.exports.router);

app.listen(port, () => {
  console.log("Start to server on localhost:2000");
});
