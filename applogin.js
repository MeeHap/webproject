var express = require("express");
var app = express();

app.get("/", function (req, res) {
  var sql = require("mssql");

  // config for your database
  var config = {
    user: "jirapat",
    password: "Mhee0551",
    server: "127.0.0.1",
    database: "ITNsynphaet",
  };

  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("SELECT * from Login_User", function (err, recordset) {
      if (err) console.log(err);

      // send records as a response
      res.send(recordset);
    });
  });
});

var server = app.listen(3000, function () {
  console.log("Server is running..");
});
