import { ErrorCode } from "./ErrorCode";
import { HttpException } from "./HttpException";

export class UnprocessableEntity extends HttpException {
  constructor(error: any, message: string, errorCode: ErrorCode) {
    super(message, errorCode, 422, error);
  }
}
