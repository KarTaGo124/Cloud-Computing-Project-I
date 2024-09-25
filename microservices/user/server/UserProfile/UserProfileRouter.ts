import { Router } from "express";
import UserProfileController from './Application/UserProfileController';

const userProfiieRouter = Router();

userProfiieRouter.get("/:id", UserProfileController.getProfileById);
userProfiieRouter.get("/:id/address", UserProfileController.getUserAddressById);
userProfiieRouter.patch("/:id/name", UserProfileController.updateUserName);
userProfiieRouter.patch("/:id/address", UserProfileController.updateUserAddress);
userProfiieRouter.patch("/:id/phone", UserProfileController.updateUserPhone);
userProfiieRouter.patch("/:id", UserProfileController.updateAllUserProfile);

export default userProfiieRouter;