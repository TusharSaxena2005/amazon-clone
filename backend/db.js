const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sneha",
  database: "amazon_clone"
});

db.connect((err) => {
  if (err) {
    console.log("DB connection error", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;