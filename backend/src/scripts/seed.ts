import { prisma } from '../config/database';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // Create a test user
  const password = await bcrypt.hash('Password123!', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@rpl.local' },
    update: {},
    create: {
      email: 'admin@rpl.local',
      password,
      firstName: 'Admin',
      lastName: 'RPL',
      role: 'ADMIN',
    },
  });

  console.log('Created user:', user.email);

  // Create an example restaurant if none exists with that name
  let rest = await prisma.restaurant.findFirst({ where: { name: 'RPL Trattoria' } });
  if (!rest) {
    rest = await prisma.restaurant.create({
      data: {
        name: 'RPL Trattoria',
        description: 'Locale di prova per RPL',
        address: 'Via Demo 1',
        city: 'DemoCity',
        region: 'DemoRegion',
        postalCode: '00000',
        // store cuisine as comma-separated string for sqlite compatibility
  cuisine: 'Italian' as any,
        priceRange: 'MID_RANGE',
        ownerId: user.id,
      },
    });
  }

  console.log('Created restaurant:', rest.name);
}

main()
  .then(() => {
    console.log('Seed completed');
    process.exit(0);
  })
  .catch((e) => {
    console.error('Seed error', e);
    process.exit(1);
  });
