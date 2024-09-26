import { Router } from "express";
import UserProfileController from "./Application/UserProfileController";

const userProfiieRouter = Router();

userProfiieRouter.get("/:id", UserProfileController.getProfileById);
userProfiieRouter.get("/address/:id", UserProfileController.getUserAddressById);
userProfiieRouter.patch("/name/:id", UserProfileController.updateName);
userProfiieRouter.patch(
  "/address/:id",
  UserProfileController.updateUserAddress
);
userProfiieRouter.patch("/phone/:id", UserProfileController.updateUserPhone);
userProfiieRouter.patch("/:id", UserProfileController.updateAllUserProfile);

export default userProfiieRouter;
