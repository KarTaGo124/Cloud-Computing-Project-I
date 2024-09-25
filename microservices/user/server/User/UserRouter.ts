import { Router } from "express";
import userController from "./Application/UserController";

const router = Router();

router.get("/:id", userController.getUserWithId);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.patch("/:id", userController.updateUsername);
router.delete("/:id", userController.deleteUser);

export default router;
