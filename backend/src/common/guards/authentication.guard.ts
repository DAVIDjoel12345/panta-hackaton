import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate } from '@nestjs/common';
/** Placeholder only. No request can authenticate until verification is implemented. */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(): never { throw new UnauthorizedException({ statusCode: 401, code: 'AUTH_REQUIRED', message: 'Authentication is not implemented.' }); }
}

