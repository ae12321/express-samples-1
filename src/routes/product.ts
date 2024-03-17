import { Router } from "express";
import { errorHandling } from "../error-handler";
import { createProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";

const productRoutes = Router();

productRoutes.post("/", [authMiddleware], errorHandling(createProduct));

export default productRoutes;
