import { ErrorCode } from "./ErrorCode";
import { HttpException } from "./HttpException";

export class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 401, null);
  }
}
