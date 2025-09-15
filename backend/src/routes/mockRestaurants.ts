import { Router } from 'express';
import { prisma } from '../config/database';
import { createRestaurantSchema, updateRestaurantSchema, extractValidationError } from '../utils/validators';

const router = Router();

// GET /api/restaurants
router.get('/', async (_req, res) => {
  try {
    const list = await prisma.restaurant.findMany({ take: 100 });
    return res.json(list);
  } catch (err) {
    console.error('Error fetching restaurants', err);
    return res.status(500).json({ error: 'internal' });
  }
});

// POST /api/restaurants
router.post('/', async (req, res) => {
  try {
    const parse = createRestaurantSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'validation', details: extractValidationError(parse.error) });
    }
    const { name, address, city, region, postalCode, ownerId, cuisine, priceRange } = parse.data;

    // Ensure owner exists; otherwise pick any user or create a placeholder
    let owner = null;
    if (ownerId) {
      owner = await prisma.user.findUnique({ where: { id: ownerId } });
    }
    if (!owner) {
      const anyUser = await prisma.user.findFirst();
      if (anyUser) owner = anyUser;
      else {
        // create a placeholder user
        owner = await prisma.user.create({
          data: {
            email: `owner_${Date.now()}@example.local`,
            password: 'placeholder',
            firstName: 'Owner',
            lastName: 'Placeholder',
          },
        });
      }
    }

    const r = await prisma.restaurant.create({
      data: {
        name,
        description: req.body.description ?? '',
        address: address ?? '',
        city: city ?? 'Unknown',
        region: region ?? 'Unknown',
        postalCode: postalCode ?? '',
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        cuisine: cuisine ?? [],
        priceRange: (priceRange ?? 'MID_RANGE') as any,
        ownerId: owner.id,
      },
    });

    return res.status(201).json(r);
  } catch (err: any) {
    console.error('Error creating restaurant', err);
    return res.status(500).json({ error: 'internal' });
  }
});

// GET /api/restaurants/:id
router.get('/:id', async (req, res) => {
  try {
    const r = await prisma.restaurant.findUnique({ where: { id: req.params.id } });
    if (!r) return res.status(404).json({ error: 'not found' });
    return res.json(r);
  } catch (err) {
    console.error('Error fetching restaurant', err);
    return res.status(500).json({ error: 'internal' });
  }
});

// PUT /api/restaurants/:id
router.put('/:id', async (req, res) => {
  try {
    const parse = updateRestaurantSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'validation', details: extractValidationError(parse.error) });
    }
    const updates: any = { ...parse.data };
    // Prevent changing ownerId to null via empty values
    if (updates.ownerId === '') delete updates.ownerId;

    const updated = await prisma.restaurant.update({ where: { id: req.params.id }, data: updates });
    return res.json(updated);
  } catch (err: any) {
    console.error('Error updating restaurant', err);
    if (err?.code === 'P2025') return res.status(404).json({ error: 'not found' });
    return res.status(500).json({ error: 'internal' });
  }
});

// DELETE /api/restaurants/:id
router.delete('/:id', async (req, res) => {
  try {
    const removed = await prisma.restaurant.delete({ where: { id: req.params.id } });
    return res.json(removed);
  } catch (err: any) {
    console.error('Error deleting restaurant', err);
    if (err?.code === 'P2025') return res.status(404).json({ error: 'not found' });
    return res.status(500).json({ error: 'internal' });
  }
});

export default router;
