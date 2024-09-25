import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DB_NAME = process.env.DB_NAME || 'userdb';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || ''; 
const DB_HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
