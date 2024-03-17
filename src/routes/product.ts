import { Router } from "express";
import { errorHandling } from "../error-handler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRoutes = Router();

productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandling(createProduct),
);
productRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandling(updateProduct),
);
productRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandling(deleteProduct),
);
productRoutes.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandling(listProducts),
);
productRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandling(getProductById),
);

export default productRoutes;
