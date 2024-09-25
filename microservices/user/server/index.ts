import express from 'express';
import sequelize from './config/db';
import User from './User/Domain/User'; 
import UserProfile from './UserProfile/Domain/UserProfile'; 

const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos MySQL exitosa');

    app.listen(8080, () => {
      console.log('Servidor corriendo en http://localhost:8080');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
