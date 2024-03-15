import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new Error("User does not exist");

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user.id }, config.SERVER_JWT_SECRET!, {
    expiresIn: "1h",
  });

  return res
    .status(200)
    .json({ message: "Login successful", data: { token, user } });
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  console.log({ email, password, name });

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) throw new Error("User already exists");

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
