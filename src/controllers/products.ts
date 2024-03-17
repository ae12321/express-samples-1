import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  return res.json(product);
};
