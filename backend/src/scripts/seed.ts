import { prisma } from '../config/database';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Seeding database with mock data...');

  // Clear existing data (optional - be careful in production!)
  await prisma.jobApplication.deleteMany();
  await prisma.jobOffer.deleteMany();
  await prisma.workerProfile.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  console.log('✨ Cleared existing data');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@rpl.local',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'RPL',
      role: 'ADMIN',
    },
  });
  console.log('👤 Created admin:', admin.email);

  // Create restaurant owners
  const defaultPassword = await bcrypt.hash('Password123!', 10);
  
  const owner1 = await prisma.user.create({
    data: {
      email: 'owner.ponte@rpl.local',
      password: defaultPassword,
      firstName: 'Giovanni',
      lastName: 'Ponte',
      role: 'RESTAURANT_OWNER',
    },
  });

  const owner2 = await prisma.user.create({
    data: {
      email: 'owner.gourmet@rpl.local',
      password: defaultPassword,
      firstName: 'Sofia',
      lastName: 'Futuri',
      role: 'RESTAURANT_OWNER',
    },
  });

  const owner3 = await prisma.user.create({
    data: {
      email: 'owner.piazza@rpl.local',
      password: defaultPassword,
      firstName: 'Marco',
      lastName: 'Fiorentini',
      role: 'RESTAURANT_OWNER',
    },
  });

  const owner4 = await prisma.user.create({
    data: {
      email: 'owner.borgo@rpl.local',
      password: defaultPassword,
      firstName: 'Laura',
      lastName: 'Bolognesi',
      role: 'RESTAURANT_OWNER',
    },
  });

  const owner5 = await prisma.user.create({
    data: {
      email: 'owner.seastars@rpl.local',
      password: defaultPassword,
      firstName: 'Antonio',
      lastName: 'Marini',
      role: 'RESTAURANT_OWNER',
    },
  });

  const owner6 = await prisma.user.create({
    data: {
      email: 'owner.radice@rpl.local',
      password: defaultPassword,
      firstName: 'Elena',
      lastName: 'Verdi',
      role: 'RESTAURANT_OWNER',
    },
  });

  console.log('👥 Created restaurant owners');

  // Create restaurants matching frontend mock data
  const trattoriaPonte = await prisma.restaurant.create({
    data: {
      name: 'Trattoria del Ponte',
      description: 'Un angolo di tradizione romana con un impegno etico certificato RPL.',
      address: 'Via del Corso 123',
      city: 'Roma',
      region: 'Lazio',
      postalCode: '00186',
      phone: '+39 06 1234567',
      email: 'info@trattoriaponte.it',
      website: 'https://trattoriaponte.it',
      cuisine: 'Tradizionale',
      priceRange: 'MID_RANGE',
      ownerId: owner1.id,
    },
  });

  const gourmetFuturo = await prisma.restaurant.create({
    data: {
      name: 'Gourmet Futuro',
      description: 'Cucina d\'avanguardia che rispetta il pianeta e i suoi lavoratori.',
      address: 'Via Montenapoleone 45',
      city: 'Milano',
      region: 'Lombardia',
      postalCode: '20121',
      phone: '+39 02 9876543',
      email: 'info@gourmetfuturo.it',
      website: 'https://gourmetfuturo.it',
      cuisine: 'Innovativa',
      priceRange: 'HIGH_END',
      ownerId: owner2.id,
    },
  });

  await prisma.restaurant.create({
    data: {
      name: 'Bistrot La Piazza',
      description: 'Un locale emergente nel cuore di Firenze, in percorso di crescita RPL.',
      address: 'Piazza della Signoria 7',
      city: 'Firenze',
      region: 'Toscana',
      postalCode: '50122',
      phone: '+39 055 234567',
      email: 'info@bistrotlapiazza.it',
      cuisine: 'Toscana',
      priceRange: 'MID_RANGE',
      ownerId: owner3.id,
    },
  });

  await prisma.restaurant.create({
    data: {
      name: 'Osteria del Borgo',
      description: 'Sapori autentici in un ambiente che valorizza il personale.',
      address: 'Via Zamboni 88',
      city: 'Bologna',
      region: 'Emilia-Romagna',
      postalCode: '40126',
      phone: '+39 051 345678',
      email: 'info@osteriaborgo.it',
      website: 'https://osteriaborgo.it',
      cuisine: 'Emiliana',
      priceRange: 'MID_RANGE',
      ownerId: owner4.id,
    },
  });

  const seaStars = await prisma.restaurant.create({
    data: {
      name: 'Sea & Stars',
      description: 'L\'eccellenza del mare con un forte impegno sociale.',
      address: 'Lungomare Caracciolo 99',
      city: 'Napoli',
      region: 'Campania',
      postalCode: '80122',
      phone: '+39 081 567890',
      email: 'info@seastars.it',
      website: 'https://seastars.it',
      cuisine: 'Pesce',
      priceRange: 'HIGH_END',
      ownerId: owner5.id,
    },
  });

  const nuovaRadice = await prisma.restaurant.create({
    data: {
      name: 'Nuova Radice',
      description: 'Start-up vegana appena entrata nel circuito formativo RPL.',
      address: 'Via Po 21',
      city: 'Torino',
      region: 'Piemonte',
      postalCode: '10123',
      phone: '+39 011 678901',
      email: 'info@nuovaradice.it',
      cuisine: 'Vegana',
      priceRange: 'BUDGET',
      ownerId: owner6.id,
    },
  });

  console.log('🍽️  Created 6 restaurants');

  // Create worker users
  const worker1 = await prisma.user.create({
    data: {
      email: 'mario.rossi@rpl.local',
      password: defaultPassword,
      firstName: 'Mario',
      lastName: 'Rossi',
      role: 'WORKER',
    },
  });

  const worker2 = await prisma.user.create({
    data: {
      email: 'anna.verdi@rpl.local',
      password: defaultPassword,
      firstName: 'Anna',
      lastName: 'Verdi',
      role: 'WORKER',
    },
  });

  const worker3 = await prisma.user.create({
    data: {
      email: 'luca.neri@rpl.local',
      password: defaultPassword,
      firstName: 'Luca',
      lastName: 'Neri',
      role: 'WORKER',
    },
  });

  const worker4 = await prisma.user.create({
    data: {
      email: 'giulia.gialli@rpl.local',
      password: defaultPassword,
      firstName: 'Giulia',
      lastName: 'Gialli',
      role: 'WORKER',
    },
  });

  console.log('👨‍🍳 Created worker users');

  // Create worker profiles
  await prisma.workerProfile.create({
    data: {
      userId: worker1.id,
      experience: 5,
      skills: 'Cucina italiana, Pasta fresca, Gestione cucina',
      languages: 'Italiano, Inglese',
      availability: 'Lun-Ven',
      hourlyRate: 15.00,
      bio: 'Chef de Partie con 5 anni di esperienza in cucina tradizionale italiana',
      isAvailable: false,
      currentRestaurantId: trattoriaPonte.id,
    },
  });

  await prisma.workerProfile.create({
    data: {
      userId: worker2.id,
      experience: 3,
      skills: 'Servizio sala, Sommelier base, Customer service',
      languages: 'Italiano, Inglese, Francese',
      availability: 'Lun-Dom',
      hourlyRate: 12.50,
      bio: 'Cameriera di sala professionale con ottime capacità relazionali',
      isAvailable: false,
      currentRestaurantId: trattoriaPonte.id,
    },
  });

  await prisma.workerProfile.create({
    data: {
      userId: worker3.id,
      experience: 8,
      skills: 'Sommelier professionista, Degustazione vini, Gestione cantina',
      languages: 'Italiano, Inglese, Spagnolo',
      availability: 'Ven-Dom',
      hourlyRate: 18.00,
      bio: 'Sommelier certificato con esperienza internazionale',
      isAvailable: false,
      currentRestaurantId: trattoriaPonte.id,
    },
  });

  const profile4 = await prisma.workerProfile.create({
    data: {
      userId: worker4.id,
      experience: 1,
      skills: 'Preparazione base, Pulizia cucina, Supporto chef',
      languages: 'Italiano',
      availability: 'Lun-Sab',
      hourlyRate: 10.00,
      bio: 'Apprendista cuoca motivata e desiderosa di imparare',
      isAvailable: true,
    },
  });

  console.log('📋 Created worker profiles');

  // Create job offers
  await prisma.jobOffer.create({
    data: {
      restaurantId: gourmetFuturo.id,
      title: 'Sous Chef',
      description: 'Cerchiamo un sous chef esperto per il nostro ristorante stellato.',
      position: 'Sous Chef',
      requirements: 'Esperienza minima 5 anni, conoscenza cucina moderna, creatività',
      salary: 2500.00,
      workingHours: '40 ore settimanali',
      contractType: 'Tempo indeterminato',
      startDate: new Date('2026-03-01'),
      isActive: true,
    },
  });

  await prisma.jobOffer.create({
    data: {
      restaurantId: seaStars.id,
      title: 'Pizzaiolo',
      description: 'Ristorante di pesce cerca pizzaiolo per nuova sezione pizzeria.',
      position: 'Pizzaiolo',
      requirements: 'Esperienza minima 3 anni, conoscenza impasti tradizionali',
      salary: 1800.00,
      workingHours: '36 ore settimanali',
      contractType: 'Tempo determinato',
      startDate: new Date('2026-02-15'),
      isActive: true,
    },
  });

  const job3 = await prisma.jobOffer.create({
    data: {
      restaurantId: nuovaRadice.id,
      title: 'Cuoco Vegano',
      description: 'Cerchiamo un cuoco specializzato in cucina vegana e plant-based.',
      position: 'Chef',
      requirements: 'Passione per la cucina vegana, creatività, esperienza minima 2 anni',
      salary: 1600.00,
      workingHours: '35 ore settimanali',
      contractType: 'Tempo determinato',
      isActive: true,
    },
  });

  console.log('💼 Created job offers');

  // Create job applications
  await prisma.jobApplication.create({
    data: {
      workerId: profile4.id,
      jobOfferId: job3.id,
      message: 'Sono molto interessata a questa opportunità e desiderosa di imparare la cucina vegana.',
      status: 'PENDING',
    },
  });

  console.log('📝 Created job applications');
  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log('  - Users: 11 (1 admin, 6 owners, 4 workers)');
  console.log('  - Restaurants: 6');
  console.log('  - Worker Profiles: 4');
  console.log('  - Job Offers: 3');
  console.log('  - Job Applications: 1');
  console.log('\n🔐 Login credentials:');
  console.log('  Admin: admin@rpl.local / Admin123!');
  console.log('  Owner: owner.ponte@rpl.local / Password123!');
  console.log('  Worker: mario.rossi@rpl.local / Password123!');
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
