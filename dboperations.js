var config = require("./dbconfig");
const sql = require("mssql");

async function getlogin_user() {
  try {
    let pool = await sql.connect(config);
    let product = await pool.request().query("SELECT * from Login_User");
    return product.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getlogin_user: getlogin_user,
};
