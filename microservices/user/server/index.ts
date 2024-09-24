import 'dotenv/config';
import express from 'express';
import { sequelize, createDatabase } from './config/db';
import User from './models/User';
import UserProfile from './models/Profile';

const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await createDatabase();

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada');

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
