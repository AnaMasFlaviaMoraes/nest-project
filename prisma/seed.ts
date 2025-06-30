import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin', 10),
      role: 'ADMIN',
    },
  });

  const commonUser = await prisma.user.upsert({
    where: { email: 'user@user.com' },
    update: {},
    create: {
      name: 'Usuário Comum',
      email: 'user@user.com',
      password: await bcrypt.hash('user', 10),
      role: 'USER',
    },
  });

  console.log('Usuários criados ✅');

  await prisma.product.createMany({
    data: [
      {
        name: 'Câmera Canon R6',
        description: 'Câmera Mirrorless',
        price: 12000,
      },
      { name: 'Lente 50mm', description: 'Lente Fixa', price: 1500 },
      {
        name: 'Tripé Profissional',
        description: 'Tripé de alumínio',
        price: 600,
      },
    ],
  });

  console.log('Produtos criados ✅');

  await prisma.financeRecord.createMany({
    data: [
      {
        description: 'Venda de ensaio fotográfico',
        type: 'ENTRADA',
        amount: 2000,
        date: new Date('2025-06-01'),
      },
      {
        description: 'Compra de lente 50mm',
        type: 'SAIDA',
        amount: 1500,
        date: new Date('2025-06-03'),
      },
      {
        description: 'Pagamento de aluguel do estúdio',
        type: 'SAIDA',
        amount: 1000,
        date: new Date('2025-06-05'),
      },
      {
        description: 'Venda de sessão premium',
        type: 'ENTRADA',
        amount: 3500,
        date: new Date('2025-06-07'),
      },
    ],
  });

  console.log('Registros financeiros criados ✅');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🌱 Seed concluída com sucesso!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
