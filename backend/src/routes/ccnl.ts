import express from 'express';
import { prisma } from '../config/database';

const router = express.Router();

/**
 * GET /api/ccnl
 * Ottiene tutti i CCNL disponibili
 */
router.get('/', async (req, res, next) => {
  try {
    const ccnls = await prisma.cCNL.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { levels: true, variants: true },
        },
      },
    });
    res.json(ccnls);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ccnl/:id
 * Ottiene un CCNL specifico con i suoi livelli e varianti
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const ccnl = await prisma.cCNL.findUnique({
      where: { id },
      include: {
        levels: {
          orderBy: { level: 'asc' },
        },
        variants: {
          where: { isActive: true },
          orderBy: { year: 'desc' },
        },
      },
    });

    if (!ccnl) {
      return res.status(404).json({ error: 'CCNL not found' });
    }

    res.json(ccnl);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ccnl/:id/levels
 * Ottiene tutti i livelli di un CCNL
 */
router.get('/:id/levels', async (req, res, next) => {
  try {
    const { id } = req.params;
    const levels = await prisma.cCNLLevel.findMany({
      where: { ccnlId: id },
      orderBy: { level: 'asc' },
    });
    res.json(levels);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ccnl/:id/variants
 * Ottiene tutte le varianti di un CCNL
 */
router.get('/:id/variants', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { year } = req.query;

    const where: any = { ccnlId: id, isActive: true };
    if (year) {
      where.year = parseInt(year as string);
    }

    const variants = await prisma.cCNLVariant.findMany({
      where,
      orderBy: { year: 'desc' },
    });
    res.json(variants);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ccnl/variants/:variantId
 * Ottiene una variante specifica con tutti i dettagli dei livelli salariali
 */
router.get('/variants/:variantId', async (req, res, next) => {
  try {
    const { variantId } = req.params;
    const variant = await prisma.cCNLVariant.findUnique({
      where: { id: variantId },
      include: {
        ccnl: true,
        variantLevels: {
          include: {
            level: true,
          },
          orderBy: {
            level: {
              level: 'asc',
            },
          },
        },
      },
    });

    if (!variant) {
      return res.status(404).json({ error: 'CCNL Variant not found' });
    }

    res.json(variant);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ccnl/variants/:variantId/levels/:levelId
 * Ottiene i dettagli salariali per un livello specifico in una variante
 */
router.get('/variants/:variantId/levels/:levelId', async (req, res, next) => {
  try {
    const { variantId, levelId } = req.params;
    const variantLevel = await prisma.cCNLVariantLevel.findUnique({
      where: {
        variantId_levelId: {
          variantId,
          levelId,
        },
      },
      include: {
        variant: {
          include: {
            ccnl: true,
          },
        },
        level: true,
      },
    });

    if (!variantLevel) {
      return res.status(404).json({ error: 'Salary data not found for this level and variant' });
    }

    res.json(variantLevel);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ccnl/search
 * Cerca CCNL per nome o settore
 */
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const ccnls = await prisma.cCNL.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: q as string, mode: 'insensitive' } },
              { sector: { contains: q as string, mode: 'insensitive' } },
              { description: { contains: q as string, mode: 'insensitive' } },
            ],
          },
        ],
      },
    });

    res.json(ccnls);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ccnl/compare/:year1/:year2
 * Confronta le varianti di due anni per un CCNL specifico
 */
router.get('/compare/:ccnlId/:year1/:year2', async (req, res, next) => {
  try {
    const { ccnlId, year1, year2 } = req.params;

    const [variant1, variant2] = await Promise.all([
      prisma.cCNLVariant.findUnique({
        where: {
          ccnlId_year: {
            ccnlId,
            year: parseInt(year1),
          },
        },
        include: {
          variantLevels: {
            include: {
              level: true,
            },
          },
        },
      }),
      prisma.cCNLVariant.findUnique({
        where: {
          ccnlId_year: {
            ccnlId,
            year: parseInt(year2),
          },
        },
        include: {
          variantLevels: {
            include: {
              level: true,
            },
          },
        },
      }),
    ]);

    if (!variant1 || !variant2) {
      return res.status(404).json({ error: 'One or both variants not found' });
    }

    // Calcola le differenze percentuali
    const comparison = {
      variant1,
      variant2,
      differences: variant1.variantLevels.map((v1Level) => {
        const v2Level = variant2.variantLevels.find(
          (v2) => v2.levelId === v1Level.levelId
        );
        if (!v2Level) return null;

        const salaryDiff = Number(v2Level.minimumSalary) - Number(v1Level.minimumSalary);
        const salaryDiffPercent =
          (salaryDiff / Number(v1Level.minimumSalary)) * 100;

        return {
          level: v1Level.level,
          year1Salary: v1Level.minimumSalary,
          year2Salary: v2Level.minimumSalary,
          difference: salaryDiff,
          differencePercent: salaryDiffPercent.toFixed(2),
        };
      }),
    };

    res.json(comparison);
  } catch (error) {
    next(error);
  }
});

export default router;
