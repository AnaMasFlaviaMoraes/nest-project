/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from '../permissions/permissions.service';
import { ROLES_KEY } from '../auth/roles.decorator';

@Injectable()
export class ModulePermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredModule = this.reflector.getAllAndOverride<string>('module', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredModule) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // SUPERUSER e ADMIN sempre têm acesso
    if (user.role === 'SUPERUSER' || user.role === 'ADMIN') {
      return true;
    }

    const hasPermission = await this.permissionsService.hasPermission(
      user.sub,
      requiredModule,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `SEM PERMISSÃO PARA ACESSAR O MÓDULO ${requiredModule}`,
      );
    }

    return true;
  }
}
