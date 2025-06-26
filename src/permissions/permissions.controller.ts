import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post(':userId/:module')
  @Roles('ADMIN', 'SUPERUSER')
  grantPermission(
    @Param('userId') userId: string,
    @Param('module') module: string,
  ) {
    return this.permissionsService.grantPermission(+userId, module);
  }

  @Delete(':userId/:module')
  @Roles('ADMIN', 'SUPERUSER')
  revokePermission(
    @Param('userId') userId: string,
    @Param('module') module: string,
  ) {
    return this.permissionsService.revokePermission(+userId, module);
  }

  @Get(':userId')
  @Roles('ADMIN', 'SUPERUSER')
  listPermissions(@Param('userId') userId: string) {
    return this.permissionsService.listPermissions(+userId);
  }
}

