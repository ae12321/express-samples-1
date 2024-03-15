import express from "express";
import { config } from "./config/config";
import { authRouter } from "./routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(config.SERVER_PORT, () => {
  console.log(`Server started on port ${config.SERVER_PORT}`);
});
