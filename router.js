const e = require("express");
var expresss = require("express");
var router = expresss.Router();

//login_user
router.post("/", (req, res) => {
  if (req.body.logsusername == log_use && req.body.logspassword == log_pass) {
    req.session.user = req.body.log_username;
    res.redirect("/views/index.html");
  } else {
    res.end("Invalid Username");
  }
});

//create class
class LogInuse {
  constructor(log_id, log_use, log_pass) {
    this.log_id = log_id;
    this.log_use = log_username;
    this.log_pass = log_password;
  }
}
//DATABASE

//connect
const dboperations = require("./dboperations");
var Db = require("./dboperations");
var login_user = require("./server");

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
  LogInuse,
  router,
  configdetail,
};
