import {
  Controller,
  Get,
  Patch,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { UpdateUserDto } from '../user/dto/user-update.dto';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Buscar dados do próprio perfil
   */
  @Get()
  getProfile(@Request() req) {
    return this.profileService.getProfile(req.user.sub);
  }

  /**
   * Atualizar dados do próprio perfil
   */
  @Patch()
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.profileService.updateProfile(req.user.sub, updateUserDto);
  }
}
