import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user/dto/user-create.dto';

async function createSuperUser() {
  const app = await NestFactory.create(AppModule);

  const prisma = new PrismaClient();

  const superuserEmail = 'super@admin.com';

  const existing = await prisma.user.findUnique({
    where: { email: superuserEmail },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash('super', 10);
    const user: CreateUserDto = {
      name: 'Super Usuário',
      email: superuserEmail,
      password: hashedPassword,
      role: 'SUPERUSER',
    };
    await prisma.user.create({
      data: user,
    });

    console.log('Superusuário criado com sucesso!');
  } else {
    console.log('Superusuário já existe. Nenhuma ação necessária.');
  }

  await app.listen(3000);
}
createSuperUser();
