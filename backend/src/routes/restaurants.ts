import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';

const router = Router();

// GET /api/restaurants - List all restaurants
router.get('/', async (_req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      take: 100,
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        workers: {
          select: {
            id: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: restaurants,
      count: restaurants.length,
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero dei ristoranti',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/restaurants/:id - Get restaurant by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: id as string },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        workers: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        jobOffers: {
          where: {
            isActive: true,
          },
        },
      },
    });

    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: 'Ristorante non trovato',
      });
      return;
    }

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero del ristorante',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/restaurants - Create new restaurant (requires authentication in production)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      address,
      city,
      region,
      postalCode,
      phone,
      email,
      website,
      cuisine,
      priceRange,
      ownerId,
    } = req.body;

    // Validate required fields
    if (!name || !address || !city || !region || !ownerId) {
      res.status(400).json({
        success: false,
        message: 'Campi obbligatori mancanti',
        required: ['name', 'address', 'city', 'region', 'ownerId'],
      });
      return;
    }

    // Check if owner exists
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      res.status(404).json({
        success: false,
        message: 'Proprietario non trovato',
      });
      return;
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description: description || '',
        address,
        city,
        region,
        postalCode: postalCode || '',
        phone,
        email,
        website,
        cuisine: cuisine || 'Italiana',
        priceRange: priceRange || 'MID_RANGE',
        ownerId,
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: restaurant,
      message: 'Ristorante creato con successo',
    });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nella creazione del ristorante',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/restaurants/:id - Update restaurant
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const restaurant = await prisma.restaurant.update({
      where: { id: id as string },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: restaurant,
      message: 'Ristorante aggiornato con successo',
    });
  } catch (error: any) {
    console.error('Error updating restaurant:', error);
    
    if (error?.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Ristorante non trovato',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Errore nell\'aggiornamento del ristorante',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE /api/restaurants/:id - Delete restaurant
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.restaurant.delete({
      where: { id: id as string },
    });

    res.json({
      success: true,
      message: 'Ristorante eliminato con successo',
    });
  } catch (error: any) {
    console.error('Error deleting restaurant:', error);
    
    if (error?.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Ristorante non trovato',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Errore nell\'eliminazione del ristorante',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;