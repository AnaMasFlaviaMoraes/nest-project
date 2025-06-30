import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFinanceDto) {
    return this.prisma.financeRecord.create({ data });
  }

  async findAll() {
    return this.prisma.financeRecord.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.financeRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Registro financeiro não encontrado');
    }

    return record;
  }

  async update(id: number, data: UpdateFinanceDto) {
    const record = await this.prisma.financeRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Registro financeiro não encontrado');
    }

    return this.prisma.financeRecord.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const record = await this.prisma.financeRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Registro financeiro não encontrado');
    }

    return this.prisma.financeRecord.delete({
      where: { id },
    });
  }
}
