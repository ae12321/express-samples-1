import express from "express";
import { config } from "./config/config";
import { authRouter } from "./routes";
import { errorHandler } from "./middlewares/errors";
import productRoutes from "./routes/product";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(config.SERVER_PORT, () => {
  console.log(`Server started on port ${config.SERVER_PORT}`);
});
