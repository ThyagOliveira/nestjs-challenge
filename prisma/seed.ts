import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { email: 'thyago@email.com' },
    update: { password: password },
    create: {
      name: 'Thyago',
      email: 'thyago@email.com',
      password: password,
    },
  });

  console.log({ user });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
