import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../user/dto/user-create.dto';
import { UpdateUserDto } from '../user/dto/user-update.dto';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Criação de usuário — somente ADMIN ou SUPERUSER
   */
  @Post()
  @Roles('ADMIN', 'SUPERUSER')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Listagem de todos os usuários — somente ADMIN ou SUPERUSER
   */
  @Get()
  @Roles('ADMIN', 'SUPERUSER')
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Buscar usuário por ID — apenas ADMIN ou SUPERUSER
   */
  @Get(':id')
  @Roles('ADMIN', 'SUPERUSER')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /**
   * Atualizar usuário — apenas ADMIN ou SUPERUSER
   */
  @Patch(':id')
  @Roles('ADMIN', 'SUPERUSER')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * Remover usuário — apenas ADMIN ou SUPERUSER
   */
  @Delete(':id')
  @Roles('ADMIN', 'SUPERUSER')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  /**
   * Endpoint extra (opcional): usuário logado pode ver seu próprio perfil
   */
  @Get('me/profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.sub);
  }
}
