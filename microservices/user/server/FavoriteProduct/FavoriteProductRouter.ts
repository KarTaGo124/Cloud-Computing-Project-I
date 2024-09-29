import { Router } from "express";
import FavoriteProductController from "./Application/FavoriteProductController";

const favProductRouter = Router();

favProductRouter.get(
	"/:userId",
	FavoriteProductController.getFavoriteProductsByUserId
);
favProductRouter.post(
	"/add/:userId/:productId",
	FavoriteProductController.addFavoriteProduct
);
favProductRouter.delete(
	"/remove/:userId/:productId",
	FavoriteProductController.removeFavoriteProduct
);

export default favProductRouter;
