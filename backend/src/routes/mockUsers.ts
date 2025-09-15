import { Router } from 'express';
import { prisma } from '../config/database';
import bcrypt from 'bcryptjs';
import { createUserSchema, updateUserSchema, extractValidationError } from '../utils/validators';

const router = Router();

// Helper to remove sensitive fields from user objects before returning
function sanitizeUser(user: any) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

// GET /api/users - list users (limit to 100)
router.get('/', async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      take: 100,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  return res.json(users.map(sanitizeUser));
  } catch (err) {
    console.error('Error fetching users', err);
    return res.status(500).json({ error: 'internal' });
  }
});

// POST /api/users - create a lightweight user (for testing)
router.post('/', async (req, res) => {
  try {
    const parse = createUserSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'validation', details: extractValidationError(parse.error) });
    }
    const { email, firstName, lastName, password } = parse.data;

    // If password not provided, create a random placeholder (not secure) for mocks
    const plain = password ?? 'change_me_please';
    const hashed = await bcrypt.hash(plain, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        firstName: firstName ?? '',
        lastName: lastName ?? '',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

  return res.status(201).json(sanitizeUser(user));
  } catch (err: any) {
    console.error('Error creating user', err);
    // Handle unique constraint violation
    if (err?.code === 'P2002') {
      return res.status(409).json({ error: 'email already exists' });
    }
  return res.status(500).json({ error: 'internal' });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  if (!user) return res.status(404).json({ error: 'not found' });
  return res.json(sanitizeUser(user));
  } catch (err) {
    console.error('Error fetching user', err);
    return res.status(500).json({ error: 'internal' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const parse = updateUserSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'validation', details: extractValidationError(parse.error) });
    }
    const updates: any = {};
    const { email, firstName, lastName, password, isActive, role } = parse.data;
    if (email) updates.email = email;
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (isActive !== undefined) updates.isActive = isActive;
    if (role !== undefined) updates.role = role;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updates,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  return res.json(sanitizeUser(user));
  } catch (err: any) {
    console.error('Error updating user', err);
  if (err?.code === 'P2025') return res.status(404).json({ error: 'not found' });
  return res.status(500).json({ error: 'internal' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
  return res.json(sanitizeUser(user));
  } catch (err: any) {
    console.error('Error deleting user', err);
  if (err?.code === 'P2025') return res.status(404).json({ error: 'not found' });
  return res.status(500).json({ error: 'internal' });
  }
});

export default router;
