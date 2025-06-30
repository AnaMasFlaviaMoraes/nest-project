import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Relatório financeiro: total de entradas, saídas e saldo
   */
  async financeSummary() {
    const entradas = await this.prisma.financeRecord.aggregate({
      _sum: { amount: true },
      where: { type: 'ENTRADA' },
    });

    const saidas = await this.prisma.financeRecord.aggregate({
      _sum: { amount: true },
      where: { type: 'SAIDA' },
    });

    const totalEntradas = entradas._sum.amount ?? 0;
    const totalSaidas = saidas._sum.amount ?? 0;
    const saldo = totalEntradas - totalSaidas;

    return {
      totalEntradas,
      totalSaidas,
      saldo,
    };
  }

  /**
   * Relatório de produtos: total de produtos cadastrados
   */
  async productSummary() {
    const total = await this.prisma.product.count();
    return { totalProdutos: total };
  }

  /**
   * Relatório de usuários: total por role
   */
  async userSummary() {
    const superusers = await this.prisma.user.count({
      where: { role: 'SUPERUSER' },
    });
    const admins = await this.prisma.user.count({
      where: { role: 'ADMIN' },
    });
    const users = await this.prisma.user.count({
      where: { role: 'USER' },
    });

    return {
      superusers,
      admins,
      users,
    };
  }
}
