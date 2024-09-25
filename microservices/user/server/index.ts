import express from 'express';
import userRouter from './User/UserRouter';          

const app = express();
app.use(express.json());  

app.use('/users', userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
