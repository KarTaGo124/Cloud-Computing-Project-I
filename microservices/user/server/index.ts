import express from "express";
import userRouter from "./User/UserRouter";
import userProfiieRouter from "./UserProfile/UserProfileRouter";
import favProductRouter from "./FavoriteProduct/FavoriteProductRouter";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swaggerConfig";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
	origin: "http://localhost:5173",
	methods: "GET,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", userRouter);
app.use("/profile", userProfiieRouter);
app.use("/favProducts", favProductRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
