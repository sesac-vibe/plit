import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@plit.com' },
    update: {},
    create: {
      id: 'demo-user',
      email: 'demo@plit.com',
      name: 'Demo User',
    },
  });

  console.log('✅ Demo user created:', demoUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
