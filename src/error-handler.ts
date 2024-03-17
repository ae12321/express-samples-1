import { NextFunction, Request, Response } from "express";
import { HttpException } from "./exceptions/HttpException";
import { InternalException } from "./exceptions/InternalException";
import { ErrorCode } from "./exceptions/ErrorCode";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/BadRequestException";

export const errorHandling = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: unknown) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        console.log("first");
        exception = error;
      } else {
        console.log("second");
        if (error instanceof ZodError) {
          exception = new BadRequestException(
            "unprocessable entity",
            ErrorCode.UNPROCESSABLE,
          );
        } else {
          exception = new InternalException(
            "internal server error...",
            error,
            ErrorCode.INTERNAL_SERVER_ERROR,
          );
        }
      }
      console.error(exception);
      next(exception);
    }
  };
};
