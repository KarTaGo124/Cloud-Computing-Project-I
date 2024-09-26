import { Router } from "express";
import userController from "./Application/UserController";

const userRouter = Router();

userRouter.get("/:id", userController.getUserWithId);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.patch("/:id", userController.updateUsername);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter; 
