import { ErrorCode } from "./ErrorCode";
import { HttpException } from "./HttpException";

export class InternalException extends HttpException {
  constructor(message: string, errors: any, errorCode: ErrorCode) {
    super(message, errorCode, 500, errors);
  }
}
