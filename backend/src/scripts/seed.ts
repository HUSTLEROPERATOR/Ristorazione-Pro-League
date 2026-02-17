import { prisma } from '../config/database';
import { AuthUtils } from '../utils/auth';

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await AuthUtils.hashPassword('AdminPass123!');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rpl.local' },
    update: {},
    create: {
      email: 'admin@rpl.local',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'RPL',
      role: 'ADMIN',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create restaurant owner user
  const ownerPassword = await AuthUtils.hashPassword('OwnerPass123!');
  const owner = await prisma.user.upsert({
    where: { email: 'owner@rpl.local' },
    update: {},
    create: {
      email: 'owner@rpl.local',
      password: ownerPassword,
      firstName: 'Mario',
      lastName: 'Rossi',
      role: 'USER',
    },
  });
  console.log('✅ Created owner user:', owner.email);

  // Create worker user
  const workerPassword = await AuthUtils.hashPassword('WorkerPass123!');
  const worker = await prisma.user.upsert({
    where: { email: 'worker@rpl.local' },
    update: {},
    create: {
      email: 'worker@rpl.local',
      password: workerPassword,
      firstName: 'Giulia',
      lastName: 'Verdi',
      role: 'USER',
    },
  });
  console.log('✅ Created worker user:', worker.email);

  // Create restaurants
  const restaurants = [
    {
      name: 'Ristorante La Piazzetta',
      description: 'Cucina tradizionale sarda con ingredienti locali e di stagione',
      address: 'Via Roma 123',
      city: 'Cagliari',
      region: 'Sardegna',
      postalCode: '09100',
      phone: '+39 070 123456',
      email: 'info@lapiazzetta.it',
      website: 'https://lapiazzetta.it',
      cuisine: 'Italiana, Sarda',
      priceRange: 'MEDIO',
      ownerId: owner.id,
    },
    {
      name: 'Trattoria del Mare',
      description: 'Specialità di pesce fresco del Mediterraneo',
      address: 'Lungomare Poetto 45',
      city: 'Cagliari',
      region: 'Sardegna',
      postalCode: '09126',
      phone: '+39 070 987654',
      email: 'info@trattoriadelmare.it',
      website: 'https://trattoriadelmare.it',
      cuisine: 'Pesce, Mediterranea',
      priceRange: 'MEDIO_ALTO',
      ownerId: owner.id,
    },
    {
      name: 'Pizzeria Da Gino',
      description: 'Pizza napoletana cotta nel forno a legna',
      address: 'Via Napoli 78',
      city: 'Sassari',
      region: 'Sardegna',
      postalCode: '07100',
      phone: '+39 079 456789',
      email: 'info@dagino.it',
      cuisine: 'Pizza, Italiana',
      priceRange: 'ECONOMICO',
      ownerId: owner.id,
    },
  ];

  for (const restaurantData of restaurants) {
    const existing = await prisma.restaurant.findFirst({
      where: { name: restaurantData.name }
    });

    if (!existing) {
      const restaurant = await prisma.restaurant.create({
        data: restaurantData,
      });
      console.log('✅ Created restaurant:', restaurant.name);

      // Create a job offer for each restaurant
      await prisma.jobOffer.create({
        data: {
          title: `Cuoco di linea - ${restaurant.name}`,
          description: 'Cerchiamo un cuoco di linea esperto con passione per la cucina tradizionale',
          position: 'COOK',
          requirements: 'Esperienza minima 2 anni, conoscenza cucina tradizionale',
          salary: 1800,
          workingHours: 'Full-time 40h/settimana',
          contractType: 'INDETERMINATO',
          restaurantId: restaurant.id,
        },
      });
      console.log('  ✅ Created job offer for:', restaurant.name);
    }
  }

  // Create worker profile
  const existingProfile = await prisma.workerProfile.findFirst({
    where: { userId: worker.id }
  });

  if (!existingProfile) {
    await prisma.workerProfile.create({
      data: {
        userId: worker.id,
        experience: 3,
        skills: 'Cucina italiana, Pasticceria, Gestione ordini',
        languages: 'Italiano, Inglese',
        availability: 'Lunedì-Sabato',
        hourlyRate: 12.5,
        bio: 'Cuoco professionista con 3 anni di esperienza in ristoranti stellati',
        isAvailable: true,
      },
    });
    console.log('✅ Created worker profile for:', worker.email);
  }

  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📋 Test Credentials:');
  console.log('  Admin:  admin@rpl.local  / AdminPass123!');
  console.log('  Owner:  owner@rpl.local  / OwnerPass123!');
  console.log('  Worker: worker@rpl.local / WorkerPass123!');
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  });
