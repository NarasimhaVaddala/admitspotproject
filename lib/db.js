import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: "sql12.freemysqlhosting.net",
  user: "sql12740457",
  password: "AcjsdCXjm7",  // Removed extra space
  database: "sql12740457",
  port: 3306,  // Explicitly define the port, although 3306 is the default
});

export default db;
