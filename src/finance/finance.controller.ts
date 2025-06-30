import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { ModulePermissionGuard } from '../guard/permission.guard';
import { ModuleAccess } from '../common/decorator/module.decorator';
import { Roles } from '../common/decorator/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, ModulePermissionGuard)
@ModuleAccess('FINANCEIRO')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post()
  @Roles('ADMIN', 'SUPERUSER')
  create(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financeService.create(createFinanceDto);
  }

  @Get()
  findAll() {
    return this.financeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financeService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERUSER')
  update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financeService.update(+id, updateFinanceDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERUSER')
  remove(@Param('id') id: string) {
    return this.financeService.remove(+id);
  }
}
