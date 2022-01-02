import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const needAdmin = this.reflector.get<boolean>(
      'admin',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }
    if (request.user.access_token !== request.header('Authorization')) {
      return false;
    }
    if (needAdmin && !request.user.admin) {
      return false;
    }
    return true;
  }
}
