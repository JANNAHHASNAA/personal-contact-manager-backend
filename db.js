const mysql = require('mysql2');
require('dotenv').config();

const urlDB = mysql.createConnection(process.env.MYSQL_URL);

const db = mysql.createConnection(
  urlDB
);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;
