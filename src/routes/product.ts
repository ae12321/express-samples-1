import { Router } from "express";
import { errorHandling } from "../error-handler";
import { createProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRoutes = Router();

productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandling(createProduct),
);

export default productRoutes;
