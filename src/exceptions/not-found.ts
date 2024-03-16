import { ErrorCode } from "./ErrorCode";
import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 404, null);
  }
}
