// import { User } from "@prisma/client";

import { User } from "@prisma/client";
import express from "express";

declare module "express" {
  export interface Request {
    user?: User;
  }
}
