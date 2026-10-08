import { Injectable, NotImplementedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
/** Global brake: registering a handler never makes an unfinished operation available. */
@Injectable()
export class ScaffoldGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if (Reflect.getMetadata('runtimeRoute', context.getClass()) === true) return true;
    throw new NotImplementedException({ statusCode: 501, code: 'NOT_IMPLEMENTED', message: 'This provider operation is not configured.' });
  }
}
