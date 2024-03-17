import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { BadRequestException } from "../exceptions/BadRequestException";
import { ErrorCode } from "../exceptions/ErrorCode";
import { SignupSchema } from "../schema/user";
import { UnprocessableEntity } from "../exceptions/UnprocessableEntity";
import { NotFoundException } from "../exceptions/not-found";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new BadRequestException(
      "Wrong password",
      ErrorCode.USER_WRONG_PASSWORD,
    );
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
  SignupSchema.parse(req.body);

  const { email, password, name } = req.body;
  console.log({ email, password, name });

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS,
    );
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

export const me = async (req: Request, res: Response, next: NextFunction) => {
  //
  return res.status(200).json(req.user);
};
