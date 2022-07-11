const dboperations = require("./dboperations");
var Db = require("./dboperations");
var login_user = require("./login_user");

dboperations.getlogin_user().then((result) => {
  console.log(result);
});
