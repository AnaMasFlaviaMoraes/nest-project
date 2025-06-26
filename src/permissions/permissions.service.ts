import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ModuleName } from '@prisma/client';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Concede permissão a um usuário para um módulo
   */
  async grantPermission(userId: number, module: ModuleName) {
    return this.prisma.permission.create({
      data: {
        userId,
        module,
      },
    });
  }

  /**
   * Revoga permissão de um usuário para um módulo
   */
  async revokePermission(userId: number, module: ModuleName) {
    return this.prisma.permission.delete({
      where: {
        userId_module: {
          userId,
          module,
        },
      },
    });
  }

  /**
   * Verifica se o usuário tem acesso a um módulo
   */
  async hasPermission(userId: number, module: ModuleName) {
    const permission = await this.prisma.permission.findUnique({
      where: {
        userId_module: {
          userId,
          module,
        },
      },
    });

    return !!permission;
  }

  /**
   * Lista todas as permissões de um usuário
   */
  async listPermissions(userId: number) {
    return this.prisma.permission.findMany({
      where: { userId },
    });
  }
}
