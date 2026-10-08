import { ForbiddenException, Injectable } from '@nestjs/common';
import type { CanActivate } from '@nestjs/common';
/** Placeholder only. No role or membership claim is trusted. */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(): never { throw new ForbiddenException({ statusCode: 403, code: 'ACCESS_DENIED', message: 'Authorization is not implemented.' }); }
}

