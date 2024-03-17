import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/ErrorCode";

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
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }
    const updatedProduct = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: product,
    });
    return res.json(updatedProduct);
  } catch (error) {
    throw new NotFoundException("product not found", ErrorCode.USER_NOT_FOUND);
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  const deletedProduct = await prisma.product.delete({
    where: { id: Number(req.params.id) },
  });
  return res.json(deletedProduct);
};
export const listProducts = async (req: Request, res: Response) => {
  const count = await prisma.product.count();
  const products = await prisma.product.findMany({
    skip: Number(req.query.skip) || 0,
    take: Number(req.query.take) || 10,
  });
  return res.json({
    count,
    products,
  });
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findFirstOrThrow({
      where: { id: Number(req.params.id) },
    });
    return res.json(product);
  } catch (error) {
    throw new NotFoundException("product not found", ErrorCode.USER_NOT_FOUND);
  }
};
