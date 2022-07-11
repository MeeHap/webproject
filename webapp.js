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
    path = "index.html";
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

server.listen(1234, "127.0.0.2", () => {
  console.log("Listening on port 1234");
});

//Connect MSSQL
// const sql = require("mssql");
// const { prototype } = require("events");

// const config = {
//   server: "localhost\\MeeHap",
//   port: 1433,
//   user: "",
//   password: "",
//   database: "ITNsynphaet",
//   option: {
//     enableArithAbort: true,
//   },
//   connectionTimeout: 150000,
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
// };
// sql.on("error", (err) => {
//   console.log(err.message);
// });

// //Async Await
// async function getDBUserAsyncFunction() {
//   try {
//     let pool = await sql.connect(config);
//     let result1 = await pool.request().query("select*from Paper_Table");
//     console.log(result1);
//     sql.close();
//   } catch (error) {
//     console.log(err.message);
//     sql.close();
//   }
// }
