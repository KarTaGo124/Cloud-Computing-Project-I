import express from 'express';
import userRouter from './User/UserRouter';       
import userProfiieRouter from './UserProfile/UserProfileRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig';

const app = express();
app.use(express.json());  

app.use('/users', userRouter);
app.use('/profile', userProfiieRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
