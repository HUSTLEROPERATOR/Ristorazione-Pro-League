import { Request, Response } from 'express';
import { prisma } from '../config/database';

export class RestaurantController {
  
  /**
   * Get all restaurants
   */
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query['page'] as string) || 1;
      const limit = parseInt(req.query['limit'] as string) || 10;
      const skip = (page - 1) * limit;

      const [restaurants, total] = await Promise.all([
        prisma.restaurant.findMany({
          skip,
          take: limit,
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            description: true,
            address: true,
            city: true,
            region: true,
            postalCode: true,
            phone: true,
            email: true,
            website: true,
            cuisine: true,
            priceRange: true,
            isActive: true,
            createdAt: true,
            owner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.restaurant.count({ where: { isActive: true } })
      ]);

      res.status(200).json({
        success: true,
        data: {
          restaurants,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });

    } catch (error) {
      console.error('List restaurants error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante il recupero dei ristoranti',
          code: 'LIST_RESTAURANTS_ERROR'
        }
      });
    }
  }

  /**
   * Get restaurant by ID
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: {
            message: 'ID ristorante richiesto',
            code: 'MISSING_RESTAURANT_ID'
          }
        });
        return;
      }

      const restaurant = await prisma.restaurant.findUnique({
        where: { id },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          jobOffers: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              position: true,
              contractType: true,
              salary: true,
              isActive: true,
              createdAt: true
            }
          }
        }
      });

      if (!restaurant) {
        res.status(404).json({
          success: false,
          error: {
            message: 'Ristorante non trovato',
            code: 'RESTAURANT_NOT_FOUND'
          }
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { restaurant }
      });

    } catch (error) {
      console.error('Get restaurant error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante il recupero del ristorante',
          code: 'GET_RESTAURANT_ERROR'
        }
      });
    }
  }

  /**
   * Create restaurant
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Autenticazione richiesta',
            code: 'AUTHENTICATION_REQUIRED'
          }
        });
        return;
      }

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
        priceRange
      } = req.body;

      // Validate required fields
      if (!name || !address || !city || !region || !postalCode || !cuisine || !priceRange) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Campi obbligatori mancanti',
            code: 'MISSING_REQUIRED_FIELDS'
          }
        });
        return;
      }

      const restaurant = await prisma.restaurant.create({
        data: {
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
          ownerId: req.user.userId
        },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        message: 'Ristorante creato con successo',
        data: { restaurant }
      });

    } catch (error) {
      console.error('Create restaurant error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante la creazione del ristorante',
          code: 'CREATE_RESTAURANT_ERROR'
        }
      });
    }
  }

  /**
   * Update restaurant
   */
  static async update(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Autenticazione richiesta',
            code: 'AUTHENTICATION_REQUIRED'
          }
        });
        return;
      }

      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: {
            message: 'ID ristorante richiesto',
            code: 'MISSING_RESTAURANT_ID'
          }
        });
        return;
      }

      // Check if restaurant exists and user is owner
      const existingRestaurant = await prisma.restaurant.findUnique({
        where: { id }
      });

      if (!existingRestaurant) {
        res.status(404).json({
          success: false,
          error: {
            message: 'Ristorante non trovato',
            code: 'RESTAURANT_NOT_FOUND'
          }
        });
        return;
      }

      if (existingRestaurant.ownerId !== req.user.userId && req.user.role !== 'ADMIN') {
        res.status(403).json({
          success: false,
          error: {
            message: 'Non hai i permessi per modificare questo ristorante',
            code: 'FORBIDDEN'
          }
        });
        return;
      }

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
        isActive
      } = req.body;

      const restaurant = await prisma.restaurant.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(description !== undefined && { description }),
          ...(address !== undefined && { address }),
          ...(city !== undefined && { city }),
          ...(region !== undefined && { region }),
          ...(postalCode !== undefined && { postalCode }),
          ...(phone !== undefined && { phone }),
          ...(email !== undefined && { email }),
          ...(website !== undefined && { website }),
          ...(cuisine !== undefined && { cuisine }),
          ...(priceRange !== undefined && { priceRange }),
          ...(isActive !== undefined && { isActive })
        },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      res.status(200).json({
        success: true,
        message: 'Ristorante aggiornato con successo',
        data: { restaurant }
      });

    } catch (error) {
      console.error('Update restaurant error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante l\'aggiornamento del ristorante',
          code: 'UPDATE_RESTAURANT_ERROR'
        }
      });
    }
  }

  /**
   * Delete restaurant (soft delete)
   */
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Autenticazione richiesta',
            code: 'AUTHENTICATION_REQUIRED'
          }
        });
        return;
      }

      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: {
            message: 'ID ristorante richiesto',
            code: 'MISSING_RESTAURANT_ID'
          }
        });
        return;
      }

      // Check if restaurant exists and user is owner
      const existingRestaurant = await prisma.restaurant.findUnique({
        where: { id }
      });

      if (!existingRestaurant) {
        res.status(404).json({
          success: false,
          error: {
            message: 'Ristorante non trovato',
            code: 'RESTAURANT_NOT_FOUND'
          }
        });
        return;
      }

      if (existingRestaurant.ownerId !== req.user.userId && req.user.role !== 'ADMIN') {
        res.status(403).json({
          success: false,
          error: {
            message: 'Non hai i permessi per eliminare questo ristorante',
            code: 'FORBIDDEN'
          }
        });
        return;
      }

      // Soft delete
      await prisma.restaurant.update({
        where: { id },
        data: { isActive: false }
      });

      res.status(200).json({
        success: true,
        message: 'Ristorante eliminato con successo'
      });

    } catch (error) {
      console.error('Delete restaurant error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante l\'eliminazione del ristorante',
          code: 'DELETE_RESTAURANT_ERROR'
        }
      });
    }
  }
}
