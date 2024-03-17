import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../exceptions/ErrorCode";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { prisma } from "../config/prisma";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization || "";
  if (!token) {
    next(new UnauthorizedException("unauthorized1", ErrorCode.UNAUTHORIZED));
    return;
  }
  try {
    const payload: { userId: number } = jwt.verify(
      token,
      config.SERVER_JWT_SECRET,
    ) as any;
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      next(new UnauthorizedException("unauthorized2", ErrorCode.UNAUTHORIZED));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("unauthorized3", ErrorCode.UNAUTHORIZED));
  }
};
