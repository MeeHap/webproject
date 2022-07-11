//PAGE HTML
//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");

//npm i mime-types
const lookup = require("mime-types").lookup;

const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  /**
   *  /
   *  /index.html
   *
   *  /main.css
   *  /main.js
   */
  if (path == "") {
    path = "login.html";
  }
  console.log(`Requested path ${path} `);

  let file = __dirname + "/views/" + path;
  //async read file function uses callback
  fs.readFile(file, function (err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      //specify the content type in the response
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      let mime = lookup(path);
      res.writeHead(200, { "Content-type": mime });
      switch (path) {
        case "style.css":
          res.writeHead(200, { "Content-type": "public/css" });
          break;
        case "main.js":
          res.writeHead(200, { "Content-type": "public/js" });
          break;
      }
      res.end(content);
    }
  });
});

server.listen(2000, "127.0.0.1", () => {
  console.log("Listening on port 2000");
});

//DATABASE

//connect
const dboperations = require("./dboperations");
var Db = require("./dboperations");
var login_user = require("./login_api");

dboperations.getlogin_user().then((result) => {
  console.log(result);
});

//set detail DB in use
const configdetail = {
  user: "jirapat",
  password: "Mhee0551",
  server: "127.0.0.1",
  database: "ITNsynphaet",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 1433,
};

module.exports = configdetail;

//select in DB
var configselect = require("./dbconfig");
const sql = require("mssql");

async function getlogin_user() {
  try {
    let pool = await sql.connect(configselect);
    let product = await pool.request().query("SELECT * from Login_User");
    return product.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getlogin_user: getlogin_user,
};

//loginset
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUnintialized: true,
  })
);
