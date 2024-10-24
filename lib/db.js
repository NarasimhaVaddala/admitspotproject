import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  // Removed extra space
  database: process.env.DB_NAME,
  port: 3306,  // Explicitly define the port, although 3306 is the default
});

export default db;
