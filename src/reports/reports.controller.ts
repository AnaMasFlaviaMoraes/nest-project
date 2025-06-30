import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { ModulePermissionGuard } from '../guard/permission.guard';
import { ModuleAccess } from '../common/decorator/module.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, ModulePermissionGuard)
@ModuleAccess('RELATORIOS')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('finance')
  financeSummary() {
    return this.reportsService.financeSummary();
  }

  @Get('products')
  productSummary() {
    return this.reportsService.productSummary();
  }

  @Get('users')
  userSummary() {
    return this.reportsService.userSummary();
  }
}
