import { Request, Response } from "express";
import { AddressSchema, updateUserSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/ErrorCode";
import { prisma } from "../config/prisma";
import { Address, User } from "@prisma/client";

export const createAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  return res.json(address);
};
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prisma.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    return res.json({ message: "Address deleted" });
  } catch (error) {
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND,
    );
  }
};
export const listAddresses = async (req: Request, res: Response) => {
  const addresses = await prisma.address.findMany({
    where: {
      userId: req.user?.id,
    },
  });
  return res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validated = updateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;
  if (validated.defaultShippingAddress) {
    const id = validated.defaultShippingAddress;
    try {
      shippingAddress = await prisma.address.findFirstOrThrow({
        where: { id },
      });
      // if (shippingAddress.userId !== req.user?.id) throw new Error("belong to address and user not match");
    } catch (error) {
      throw new NotFoundException(
        "Shipping address not found",
        ErrorCode.ADDRESS_NOT_FOUND,
      );
    }
  }
  if (validated.defaultBillingAddress) {
    const id = validated.defaultBillingAddress;
    try {
      billingAddress = await prisma.address.findFirstOrThrow({
        where: { id },
      });
      // if (shippingAddress.userId !== req.user?.id) throw new Error("belong to address and user not match");
    } catch (error) {
      throw new NotFoundException(
        "Shipping address not found",
        ErrorCode.ADDRESS_NOT_FOUND,
      );
    }
  }

  const updated = await prisma.user.update({
    where: { id: req.user?.id },
    data: {},
  });
};
