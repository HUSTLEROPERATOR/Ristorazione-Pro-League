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

  // CCNL Seeding
  console.log('Seeding CCNL data...');

  // 1. Create CCNL Turismo
  const ccnlTurismo = await prisma.cCNL.upsert({
    where: { name: 'Turismo' },
    update: {},
    create: {
      name: 'Turismo',
      description: 'Contratto Collettivo Nazionale di Lavoro per il settore Turismo',
      sector: 'Turismo e Pubblici Esercizi',
      isActive: true,
    },
  });
  console.log('Created CCNL:', ccnlTurismo.name);

  // 2. Create CCNL Pubblici Esercizi
  const ccnlPubbliciEsercizi = await prisma.cCNL.upsert({
    where: { name: 'Pubblici Esercizi' },
    update: {},
    create: {
      name: 'Pubblici Esercizi',
      description: 'Contratto Collettivo Nazionale di Lavoro per i Pubblici Esercizi, Ristorazione Collettiva e Commerciale e Turismo',
      sector: 'Pubblici Esercizi e Ristorazione',
      isActive: true,
    },
  });
  console.log('Created CCNL:', ccnlPubbliciEsercizi.name);

  // 3. Define CCNL Levels for Turismo
  const turismoLevels = [
    { level: '1°', description: 'Lavoratori addetti a mansioni semplici e di ordine - es. Ausiliario di cucina, Addetto pulizie' },
    { level: '2°', description: 'Lavoratori che svolgono mansioni di base - es. Aiuto cuoco, Cameriere ai piani, Addetto al guardaroba' },
    { level: '3°', description: 'Lavoratori qualificati - es. Cuoco, Cameriere di sala, Barista, Receptionist' },
    { level: '4°', description: 'Lavoratori specializzati - es. Chef de partie, Capo cameriere, Barman, Receptionist senior' },
    { level: '5°', description: 'Lavoratori con mansioni di coordinamento - es. Sous chef, Maître, Capo barista, Front office manager' },
    { level: '6°', description: 'Lavoratori con autonomia decisionale - es. Executive chef, Restaurant manager, Food & Beverage manager' },
    { level: '7°', description: 'Lavoratori con elevate competenze tecniche e gestionali - es. Executive chef stelle Michelin, General manager' },
    { level: 'Quadro', description: 'Quadri con funzioni direttive e di coordinamento generale' },
  ];

  for (const levelData of turismoLevels) {
    await prisma.cCNLLevel.upsert({
      where: {
        ccnlId_level: {
          ccnlId: ccnlTurismo.id,
          level: levelData.level,
        },
      },
      update: {},
      create: {
        ccnlId: ccnlTurismo.id,
        level: levelData.level,
        description: levelData.description,
      },
    });
  }
  console.log('Created CCNL Turismo levels');

  // 4. Define CCNL Levels for Pubblici Esercizi (similar structure)
  const pubbliciEserciziLevels = [
    { level: '1°', description: 'Addetti a mansioni ausiliarie - es. Lavapiatti, Addetto alle pulizie' },
    { level: '2°', description: 'Addetti a mansioni esecutive semplici - es. Aiuto cuoco, Commis di sala' },
    { level: '3°', description: 'Personale qualificato - es. Cuoco, Pizzaiolo, Cameriere qualificato, Barista' },
    { level: '4°', description: 'Personale specializzato - es. Chef de partie, Sommelier, Capo sala, Barman' },
    { level: '5°', description: 'Personale con funzioni di coordinamento - es. Sous chef, Maître de salle, Responsabile bar' },
    { level: '6°', description: 'Personale con funzioni direttive - es. Executive chef, Direttore di sala, F&B Manager' },
    { level: '7°', description: 'Alte specializzazioni - es. Executive chef alta cucina, Restaurant director' },
    { level: 'Quadro', description: 'Quadri direttivi con funzioni strategiche e gestionali' },
  ];

  for (const levelData of pubbliciEserciziLevels) {
    await prisma.cCNLLevel.upsert({
      where: {
        ccnlId_level: {
          ccnlId: ccnlPubbliciEsercizi.id,
          level: levelData.level,
        },
      },
      update: {},
      create: {
        ccnlId: ccnlPubbliciEsercizi.id,
        level: levelData.level,
        description: levelData.description,
      },
    });
  }
  console.log('Created CCNL Pubblici Esercizi levels');

  // 5. Create CCNL Variant 2025 for Turismo
  const variant2025Turismo = await prisma.cCNLVariant.upsert({
    where: {
      ccnlId_year: {
        ccnlId: ccnlTurismo.id,
        year: 2025,
      },
    },
    update: {},
    create: {
      ccnlId: ccnlTurismo.id,
      year: 2025,
      name: 'CCNL Turismo 2025',
      validFrom: new Date('2025-01-01'),
      validTo: new Date('2025-12-31'),
      description: 'Rinnovo contrattuale 2025 con adeguamento salariale inflazione +3.2%',
      isActive: true,
    },
  });
  console.log('Created CCNL Variant 2025 Turismo');

  // 6. Create CCNL Variant 2026 for Turismo
  const variant2026Turismo = await prisma.cCNLVariant.upsert({
    where: {
      ccnlId_year: {
        ccnlId: ccnlTurismo.id,
        year: 2026,
      },
    },
    update: {},
    create: {
      ccnlId: ccnlTurismo.id,
      year: 2026,
      name: 'CCNL Turismo 2026',
      validFrom: new Date('2026-01-01'),
      validTo: null,
      description: 'Rinnovo contrattuale 2026 con adeguamento salariale previsto +2.8%, nuovi benefit welfare aziendale',
      isActive: true,
    },
  });
  console.log('Created CCNL Variant 2026 Turismo');

  // 7. Create CCNL Variant 2025 for Pubblici Esercizi
  const variant2025PE = await prisma.cCNLVariant.upsert({
    where: {
      ccnlId_year: {
        ccnlId: ccnlPubbliciEsercizi.id,
        year: 2025,
      },
    },
    update: {},
    create: {
      ccnlId: ccnlPubbliciEsercizi.id,
      year: 2025,
      name: 'CCNL Pubblici Esercizi 2025',
      validFrom: new Date('2025-01-01'),
      validTo: new Date('2025-12-31'),
      description: 'Rinnovo contrattuale 2025 con adeguamento salariale +3.5% e miglioramenti normativi',
      isActive: true,
    },
  });
  console.log('Created CCNL Variant 2025 Pubblici Esercizi');

  // 8. Create CCNL Variant 2026 for Pubblici Esercizi
  const variant2026PE = await prisma.cCNLVariant.upsert({
    where: {
      ccnlId_year: {
        ccnlId: ccnlPubbliciEsercizi.id,
        year: 2026,
      },
    },
    update: {},
    create: {
      ccnlId: ccnlPubbliciEsercizi.id,
      year: 2026,
      name: 'CCNL Pubblici Esercizi 2026',
      validFrom: new Date('2026-01-01'),
      validTo: null,
      description: 'Rinnovo contrattuale 2026 con adeguamento salariale previsto +3.0%, focus su sostenibilità e formazione',
      isActive: true,
    },
  });
  console.log('Created CCNL Variant 2026 Pubblici Esercizi');

  // 9. Get all levels for each CCNL
  const turismoDbLevels = await prisma.cCNLLevel.findMany({
    where: { ccnlId: ccnlTurismo.id },
  });

  const pubbliciEserciziDbLevels = await prisma.cCNLLevel.findMany({
    where: { ccnlId: ccnlPubbliciEsercizi.id },
  });

  // 10. Define salary data for CCNL Turismo 2025
  const salaryDataTurismo2025 = [
    { level: '1°', minimumSalary: 1350.00, hourlyRate: 8.50, overtimeRate: 10.63, holidayRate: 11.90, nightShiftRate: 9.35, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '2°', minimumSalary: 1450.00, hourlyRate: 9.10, overtimeRate: 11.38, holidayRate: 12.74, nightShiftRate: 10.01, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '3°', minimumSalary: 1620.00, hourlyRate: 10.15, overtimeRate: 12.69, holidayRate: 14.21, nightShiftRate: 11.17, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €200/anno' },
    { level: '4°', minimumSalary: 1820.00, hourlyRate: 11.40, overtimeRate: 14.25, holidayRate: 15.96, nightShiftRate: 12.54, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €300/anno' },
    { level: '5°', minimumSalary: 2050.00, hourlyRate: 12.85, overtimeRate: 16.06, holidayRate: 17.99, nightShiftRate: 14.14, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €500/anno' },
    { level: '6°', minimumSalary: 2380.00, hourlyRate: 14.90, overtimeRate: 18.63, holidayRate: 20.86, nightShiftRate: 16.39, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €700/anno' },
    { level: '7°', minimumSalary: 2780.00, hourlyRate: 17.40, overtimeRate: 21.75, holidayRate: 24.36, nightShiftRate: 19.14, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €1000/anno' },
    { level: 'Quadro', minimumSalary: 3350.00, hourlyRate: 20.95, overtimeRate: 26.19, holidayRate: 29.33, nightShiftRate: 23.05, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €1500/anno, Auto aziendale' },
  ];

  for (const salaryData of salaryDataTurismo2025) {
    const level = turismoDbLevels.find(l => l.level === salaryData.level);
    if (level) {
      await prisma.cCNLVariantLevel.upsert({
        where: {
          variantId_levelId: {
            variantId: variant2025Turismo.id,
            levelId: level.id,
          },
        },
        update: {},
        create: {
          variantId: variant2025Turismo.id,
          levelId: level.id,
          minimumSalary: salaryData.minimumSalary,
          hourlyRate: salaryData.hourlyRate,
          overtimeRate: salaryData.overtimeRate,
          holidayRate: salaryData.holidayRate,
          nightShiftRate: salaryData.nightShiftRate,
          mealAllowance: salaryData.mealAllowance,
          otherBenefits: salaryData.otherBenefits,
        },
      });
    }
  }
  console.log('Created salary data for CCNL Turismo 2025');

  // 11. Define salary data for CCNL Turismo 2026 (with 2.8% increase)
  const salaryDataTurismo2026 = [
    { level: '1°', minimumSalary: 1388.00, hourlyRate: 8.74, overtimeRate: 10.93, holidayRate: 12.24, nightShiftRate: 9.61, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '2°', minimumSalary: 1491.00, hourlyRate: 9.36, overtimeRate: 11.70, holidayRate: 13.10, nightShiftRate: 10.29, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '3°', minimumSalary: 1665.00, hourlyRate: 10.43, overtimeRate: 13.04, holidayRate: 14.61, nightShiftRate: 11.48, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €250/anno' },
    { level: '4°', minimumSalary: 1871.00, hourlyRate: 11.72, overtimeRate: 14.65, holidayRate: 16.41, nightShiftRate: 12.89, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €350/anno' },
    { level: '5°', minimumSalary: 2107.00, hourlyRate: 13.21, overtimeRate: 16.51, holidayRate: 18.50, nightShiftRate: 14.53, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €600/anno' },
    { level: '6°', minimumSalary: 2447.00, hourlyRate: 15.32, overtimeRate: 19.15, holidayRate: 21.45, nightShiftRate: 16.85, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €800/anno' },
    { level: '7°', minimumSalary: 2858.00, hourlyRate: 17.89, overtimeRate: 22.36, holidayRate: 25.05, nightShiftRate: 19.68, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €1200/anno' },
    { level: 'Quadro', minimumSalary: 3444.00, hourlyRate: 21.54, overtimeRate: 26.93, holidayRate: 30.15, nightShiftRate: 23.69, mealAllowance: 5.44, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €2000/anno, Auto aziendale' },
  ];

  for (const salaryData of salaryDataTurismo2026) {
    const level = turismoDbLevels.find(l => l.level === salaryData.level);
    if (level) {
      await prisma.cCNLVariantLevel.upsert({
        where: {
          variantId_levelId: {
            variantId: variant2026Turismo.id,
            levelId: level.id,
          },
        },
        update: {},
        create: {
          variantId: variant2026Turismo.id,
          levelId: level.id,
          minimumSalary: salaryData.minimumSalary,
          hourlyRate: salaryData.hourlyRate,
          overtimeRate: salaryData.overtimeRate,
          holidayRate: salaryData.holidayRate,
          nightShiftRate: salaryData.nightShiftRate,
          mealAllowance: salaryData.mealAllowance,
          otherBenefits: salaryData.otherBenefits,
        },
      });
    }
  }
  console.log('Created salary data for CCNL Turismo 2026');

  // 12. Define salary data for CCNL Pubblici Esercizi 2025
  const salaryDataPE2025 = [
    { level: '1°', minimumSalary: 1380.00, hourlyRate: 8.65, overtimeRate: 10.81, holidayRate: 12.11, nightShiftRate: 9.52, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '2°', minimumSalary: 1490.00, hourlyRate: 9.35, overtimeRate: 11.69, holidayRate: 13.09, nightShiftRate: 10.29, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '3°', minimumSalary: 1680.00, hourlyRate: 10.52, overtimeRate: 13.15, holidayRate: 14.73, nightShiftRate: 11.57, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €200/anno' },
    { level: '4°', minimumSalary: 1890.00, hourlyRate: 11.85, overtimeRate: 14.81, holidayRate: 16.59, nightShiftRate: 13.04, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €350/anno' },
    { level: '5°', minimumSalary: 2140.00, hourlyRate: 13.40, overtimeRate: 16.75, holidayRate: 18.76, nightShiftRate: 14.74, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €500/anno' },
    { level: '6°', minimumSalary: 2480.00, hourlyRate: 15.52, overtimeRate: 19.40, holidayRate: 21.73, nightShiftRate: 17.07, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €750/anno' },
    { level: '7°', minimumSalary: 2900.00, hourlyRate: 18.15, overtimeRate: 22.69, holidayRate: 25.41, nightShiftRate: 19.97, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €1000/anno' },
    { level: 'Quadro', minimumSalary: 3500.00, hourlyRate: 21.90, overtimeRate: 27.38, holidayRate: 30.67, nightShiftRate: 24.09, mealAllowance: 5.29, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €1500/anno, Auto aziendale' },
  ];

  for (const salaryData of salaryDataPE2025) {
    const level = pubbliciEserciziDbLevels.find(l => l.level === salaryData.level);
    if (level) {
      await prisma.cCNLVariantLevel.upsert({
        where: {
          variantId_levelId: {
            variantId: variant2025PE.id,
            levelId: level.id,
          },
        },
        update: {},
        create: {
          variantId: variant2025PE.id,
          levelId: level.id,
          minimumSalary: salaryData.minimumSalary,
          hourlyRate: salaryData.hourlyRate,
          overtimeRate: salaryData.overtimeRate,
          holidayRate: salaryData.holidayRate,
          nightShiftRate: salaryData.nightShiftRate,
          mealAllowance: salaryData.mealAllowance,
          otherBenefits: salaryData.otherBenefits,
        },
      });
    }
  }
  console.log('Created salary data for CCNL Pubblici Esercizi 2025');

  // 13. Define salary data for CCNL Pubblici Esercizi 2026 (with 3.0% increase)
  const salaryDataPE2026 = [
    { level: '1°', minimumSalary: 1421.00, hourlyRate: 8.91, overtimeRate: 11.14, holidayRate: 12.48, nightShiftRate: 9.81, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '2°', minimumSalary: 1535.00, hourlyRate: 9.63, overtimeRate: 12.04, holidayRate: 13.48, nightShiftRate: 10.60, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa' },
    { level: '3°', minimumSalary: 1730.00, hourlyRate: 10.84, overtimeRate: 13.55, holidayRate: 15.17, nightShiftRate: 11.92, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €250/anno' },
    { level: '4°', minimumSalary: 1947.00, hourlyRate: 12.21, overtimeRate: 15.26, holidayRate: 17.09, nightShiftRate: 13.43, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €400/anno' },
    { level: '5°', minimumSalary: 2204.00, hourlyRate: 13.80, overtimeRate: 17.25, holidayRate: 19.32, nightShiftRate: 15.18, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €600/anno' },
    { level: '6°', minimumSalary: 2554.00, hourlyRate: 15.99, overtimeRate: 19.99, holidayRate: 22.39, nightShiftRate: 17.59, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €900/anno' },
    { level: '7°', minimumSalary: 2987.00, hourlyRate: 18.69, overtimeRate: 23.36, holidayRate: 26.17, nightShiftRate: 20.57, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €1200/anno' },
    { level: 'Quadro', minimumSalary: 3605.00, hourlyRate: 22.56, overtimeRate: 28.20, holidayRate: 31.59, nightShiftRate: 24.81, mealAllowance: 5.45, otherBenefits: 'Assicurazione sanitaria integrativa, Welfare aziendale €2000/anno, Auto aziendale' },
  ];

  for (const salaryData of salaryDataPE2026) {
    const level = pubbliciEserciziDbLevels.find(l => l.level === salaryData.level);
    if (level) {
      await prisma.cCNLVariantLevel.upsert({
        where: {
          variantId_levelId: {
            variantId: variant2026PE.id,
            levelId: level.id,
          },
        },
        update: {},
        create: {
          variantId: variant2026PE.id,
          levelId: level.id,
          minimumSalary: salaryData.minimumSalary,
          hourlyRate: salaryData.hourlyRate,
          overtimeRate: salaryData.overtimeRate,
          holidayRate: salaryData.holidayRate,
          nightShiftRate: salaryData.nightShiftRate,
          mealAllowance: salaryData.mealAllowance,
          otherBenefits: salaryData.otherBenefits,
        },
      });
    }
  }
  console.log('Created salary data for CCNL Pubblici Esercizi 2026');

  console.log('✅ CCNL data seeding completed successfully!');
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
