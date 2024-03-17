import { Router } from "express";
import { errorHandling } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import {
  createAddress,
  deleteAddress,
  listAddresses,
  updateUser,
} from "../controllers/users";

const router = Router();

const middlewares = [authMiddleware];

router.post("/address", middlewares, errorHandling(createAddress));
router.post("/address/:id", middlewares, errorHandling(deleteAddress));
router.post("/address", middlewares, errorHandling(listAddresses));
router.post("/", middlewares, errorHandling(updateUser));

export const usersRouter = router;
