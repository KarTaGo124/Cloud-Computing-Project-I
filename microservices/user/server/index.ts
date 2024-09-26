import express from "express";
import userRouter from "./User/UserRouter";
import userProfiieRouter from "./UserProfile/UserProfileRouter";
import favProductRouter from "./FavoriteProduct/FavoriteProductRouter";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swaggerConfig";

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/profile", userProfiieRouter);
app.use("/favProducts", favProductRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
