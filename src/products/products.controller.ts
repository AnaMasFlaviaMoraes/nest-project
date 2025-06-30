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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { ModulePermissionGuard } from '../guard/permission.guard';
import { ModuleAccess } from '../common/decorator/module.decorator';
import { Roles } from '../common/decorator/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, ModulePermissionGuard)
@ModuleAccess('PRODUTOS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('ADMIN', 'SUPERUSER')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERUSER')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERUSER')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
