var express = require("express");
var router = express.Router();
const credential = {
    username = configselect.log_username,
    password = configselect.log_password
}

//login_user
router.post('/login_api.js',(req,res)=>{
    if(req.body.username == credential.username&&req.body.password == credential.password){
        req.session.user = req.body.username;
        res.redirect('/views/index.html')
    }else{
        res.end("Invalid Username")
    }
})


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
