import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { BadRequestException } from "../exceptions/BadRequestException";
import { ErrorCode } from "../exceptions/ErrorCode";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    next(new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND));
    return;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    next(
      new BadRequestException("Wrong password", ErrorCode.USER_WRONG_PASSWORD),
    );
    return;
  }

  const token = jwt.sign({ userId: user.id }, config.SERVER_JWT_SECRET!, {
    expiresIn: "1h",
  });

  return res
    .status(200)
    .json({ message: "Login successful", data: { token, user } });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, name } = req.body;
  console.log({ email, password, name });

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    next(
      new BadRequestException(
        "User already exists",
        ErrorCode.USER_ALREADY_EXISTS,
      ),
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.status(200).json({ message: "signup completed", data: newUser });
};
