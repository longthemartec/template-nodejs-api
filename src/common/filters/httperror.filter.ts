import type { Type } from '../interfaces';
import { HttpStatus } from '../constants';
import { BadRequestException } from './bad-request.exception';
import { BadGatewayException } from './bad-gateway.exception';
import { ConflictException } from './conflict.exception';
import { ForbiddenException } from './forbidden.exception';
import { GatewayTimeoutException } from './gateway-timeout.exception';
import { GoneException } from './gone.exception';
import { ImATeapotException } from './im-a-teapot.exception';
import { InternalServerErrorException } from './internal-server-error.exception';
import { MethodNotAllowedException } from './method-not-allowed.exception';
import { NotAcceptableException } from './not-acceptable.exception';
import { NotFoundException } from './not-found.exception';
import { NotImplementedException } from './not-implemented.exception';
import { PayloadTooLargeException } from './payload-too-large.exception';
import { PreconditionFailedException } from './precondition-failed.exception';
import { RequestTimeoutException } from './request-timeout.exception';
import { ServiceUnavailableException } from './service-unavailable.exception';
import { UnauthorizedException } from './unauthorized.exception';
import { UnprocessableEntityException } from './unprocessable-entity.exception';
import { UnsupportedMediaTypeException } from './unsupported-media-type.exception';

export type ErrorHttpStatusCode =
  | HttpStatus.BAD_GATEWAY
  | HttpStatus.BAD_REQUEST
  | HttpStatus.CONFLICT
  | HttpStatus.FORBIDDEN
  | HttpStatus.GATEWAY_TIMEOUT
  | HttpStatus.GONE
  | HttpStatus.I_AM_A_TEAPOT
  | HttpStatus.INTERNAL_SERVER_ERROR
  | HttpStatus.METHOD_NOT_ALLOWED
  | HttpStatus.NOT_ACCEPTABLE
  | HttpStatus.NOT_FOUND
  | HttpStatus.NOT_IMPLEMENTED
  | HttpStatus.PAYLOAD_TOO_LARGE
  | HttpStatus.PRECONDITION_FAILED
  | HttpStatus.REQUEST_TIMEOUT
  | HttpStatus.SERVICE_UNAVAILABLE
  | HttpStatus.UNAUTHORIZED
  | HttpStatus.UNPROCESSABLE_ENTITY
  | HttpStatus.UNSUPPORTED_MEDIA_TYPE;

export const HttpErrorByCode: Record<ErrorHttpStatusCode, Type<unknown>> = {
  [HttpStatus.BAD_GATEWAY]: BadGatewayException,
  [HttpStatus.BAD_REQUEST]: BadRequestException,
  [HttpStatus.CONFLICT]: ConflictException,
  [HttpStatus.FORBIDDEN]: ForbiddenException,
  [HttpStatus.GATEWAY_TIMEOUT]: GatewayTimeoutException,
  [HttpStatus.GONE]: GoneException,
  [HttpStatus.I_AM_A_TEAPOT]: ImATeapotException,
  [HttpStatus.INTERNAL_SERVER_ERROR]: InternalServerErrorException,
  [HttpStatus.METHOD_NOT_ALLOWED]: MethodNotAllowedException,
  [HttpStatus.NOT_ACCEPTABLE]: NotAcceptableException,
  [HttpStatus.NOT_FOUND]: NotFoundException,
  [HttpStatus.NOT_IMPLEMENTED]: NotImplementedException,
  [HttpStatus.PAYLOAD_TOO_LARGE]: PayloadTooLargeException,
  [HttpStatus.PRECONDITION_FAILED]: PreconditionFailedException,
  [HttpStatus.REQUEST_TIMEOUT]: RequestTimeoutException,
  [HttpStatus.SERVICE_UNAVAILABLE]: ServiceUnavailableException,
  [HttpStatus.UNAUTHORIZED]: UnauthorizedException,
  [HttpStatus.UNPROCESSABLE_ENTITY]: UnprocessableEntityException,
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: UnsupportedMediaTypeException,
};
