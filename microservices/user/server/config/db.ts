import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,  
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'userdb',
});

console.log('DB connected');

pool.query("USE userdb; SHOW TABLES;")
  .then(([rows]) => console.log(rows))
  .catch(console.error);

export default pool;
