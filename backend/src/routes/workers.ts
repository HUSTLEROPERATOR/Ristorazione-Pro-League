import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';

const router = Router();

// GET /api/workers - List all worker profiles
router.get('/', async (_req: Request, res: Response) => {
  try {
    const workers = await prisma.workerProfile.findMany({
      take: 100,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        currentRestaurant: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: workers,
      count: workers.length,
    });
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero dei profili lavoratori',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/workers/jobs - List available job offers (must come before /:id)
router.get('/jobs', async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.jobOffer.findMany({
      where: {
        isActive: true,
      },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            city: true,
            region: true,
            cuisine: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero delle offerte di lavoro',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/workers/:id - Get worker profile by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const worker = await prisma.workerProfile.findUnique({
      where: { id: id as string },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
          },
        },
        currentRestaurant: {
          select: {
            id: true,
            name: true,
            city: true,
            cuisine: true,
          },
        },
        applications: {
          include: {
            jobOffer: {
              include: {
                restaurant: {
                  select: {
                    id: true,
                    name: true,
                    city: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Profilo lavoratore non trovato',
      });
      return;
    }

    res.json({
      success: true,
      data: worker,
    });
  } catch (error) {
    console.error('Error fetching worker:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero del profilo lavoratore',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/workers - Create worker profile
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId,
      experience,
      skills,
      languages,
      availability,
      hourlyRate,
      bio,
      isAvailable,
    } = req.body;

    // Validate required fields
    if (!userId || experience === undefined || !skills || !languages || !availability) {
      res.status(400).json({
        success: false,
        message: 'Campi obbligatori mancanti',
        required: ['userId', 'experience', 'skills', 'languages', 'availability'],
      });
      return;
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Utente non trovato',
      });
      return;
    }

    // Check if profile already exists
    const existingProfile = await prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      res.status(409).json({
        success: false,
        message: 'Profilo lavoratore già esistente per questo utente',
      });
      return;
    }

    const worker = await prisma.workerProfile.create({
      data: {
        userId,
        experience,
        skills,
        languages,
        availability,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        bio,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
      },
      include: {
        user: {
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
      data: worker,
      message: 'Profilo lavoratore creato con successo',
    });
  } catch (error) {
    console.error('Error creating worker profile:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nella creazione del profilo lavoratore',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/workers/:id - Update worker profile
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.userId;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Convert hourlyRate to float if present
    if (updateData.hourlyRate) {
      updateData.hourlyRate = parseFloat(updateData.hourlyRate);
    }

    const worker = await prisma.workerProfile.update({
      where: { id: id as string },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        currentRestaurant: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: worker,
      message: 'Profilo lavoratore aggiornato con successo',
    });
  } catch (error: any) {
    console.error('Error updating worker profile:', error);
    
    if (error?.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Profilo lavoratore non trovato',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Errore nell\'aggiornamento del profilo lavoratore',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/workers/:workerId/apply/:jobId - Apply for a job
router.post('/:workerId/apply/:jobId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { workerId, jobId } = req.params;
    const { message } = req.body;

    // Check if worker profile exists
    const worker = await prisma.workerProfile.findUnique({
      where: { id: workerId as string },
    });

    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Profilo lavoratore non trovato',
      });
      return;
    }

    // Check if job offer exists
    const job = await prisma.jobOffer.findUnique({
      where: { id: jobId as string },
    });

    if (!job) {
      res.status(404).json({
        success: false,
        message: 'Offerta di lavoro non trovata',
      });
      return;
    }

    if (!job.isActive) {
      res.status(400).json({
        success: false,
        message: 'Offerta di lavoro non più attiva',
      });
      return;
    }

    // Check if already applied
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        workerId_jobOfferId: {
          workerId: workerId as string,
          jobOfferId: jobId as string,
        },
      },
    });

    if (existingApplication) {
      res.status(409).json({
        success: false,
        message: 'Hai già fatto richiesta per questa offerta',
      });
      return;
    }

    const application = await prisma.jobApplication.create({
      data: {
        workerId: workerId as string,
        jobOfferId: jobId as string,
        message: message || '',
        status: 'PENDING',
      },
      include: {
        jobOffer: {
          include: {
            restaurant: {
              select: {
                name: true,
                city: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: application,
      message: 'Candidatura inviata con successo',
    });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({
      success: false,
      message: 'Errore nell\'invio della candidatura',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;