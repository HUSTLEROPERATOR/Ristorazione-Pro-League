import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { AuthUtils } from '../utils/auth';

export class UserController {
  
  /**
   * Get current user profile
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
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

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          restaurants: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              city: true,
              region: true,
              cuisine: true
            }
          },
          workerProfiles: {
            select: {
              id: true,
              experience: true,
              isAvailable: true,
              currentRestaurant: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          error: {
            message: 'Utente non trovato',
            code: 'USER_NOT_FOUND'
          }
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { user }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante il recupero del profilo',
          code: 'PROFILE_ERROR'
        }
      });
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(req: Request, res: Response): Promise<void> {
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

      const { firstName, lastName, email, currentPassword, newPassword } = req.body;

      // If changing password, verify current password
      if (newPassword) {
        if (!currentPassword) {
          res.status(400).json({
            success: false,
            error: {
              message: 'Password attuale richiesta per cambiarla',
              code: 'CURRENT_PASSWORD_REQUIRED'
            }
          });
          return;
        }

        const user = await prisma.user.findUnique({
          where: { id: req.user.userId }
        });

        if (!user) {
          res.status(404).json({
            success: false,
            error: {
              message: 'Utente non trovato',
              code: 'USER_NOT_FOUND'
            }
          });
          return;
        }

        const isValidPassword = await AuthUtils.comparePassword(currentPassword, user.password);

        if (!isValidPassword) {
          res.status(401).json({
            success: false,
            error: {
              message: 'Password attuale non corretta',
              code: 'INVALID_PASSWORD'
            }
          });
          return;
        }

        // Validate new password strength
        const passwordValidation = AuthUtils.validatePasswordStrength(newPassword);
        if (!passwordValidation.isValid) {
          res.status(400).json({
            success: false,
            error: {
              message: 'La nuova password non soddisfa i requisiti',
              code: 'WEAK_PASSWORD',
              details: passwordValidation.errors
            }
          });
          return;
        }
      }

      // Check if email is being changed and if it's already in use
      if (email && email !== req.user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });

        if (existingUser) {
          res.status(409).json({
            success: false,
            error: {
              message: 'Email già in uso',
              code: 'EMAIL_ALREADY_EXISTS'
            }
          });
          return;
        }
      }

      // Prepare update data
      const updateData: any = {};
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (email !== undefined) updateData.email = email;
      if (newPassword) updateData.password = await AuthUtils.hashPassword(newPassword);

      const updatedUser = await prisma.user.update({
        where: { id: req.user.userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          updatedAt: true
        }
      });

      res.status(200).json({
        success: true,
        message: 'Profilo aggiornato con successo',
        data: { user: updatedUser }
      });

    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante l\'aggiornamento del profilo',
          code: 'UPDATE_PROFILE_ERROR'
        }
      });
    }
  }

  /**
   * List all users (Admin only)
   */
  static async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query['page'] as string) || 1;
      const limit = parseInt(req.query['limit'] as string) || 10;
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          skip,
          take: limit,
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
            createdAt: true,
            _count: {
              select: {
                restaurants: true,
                workerProfiles: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.user.count()
      ]);

      res.status(200).json({
        success: true,
        data: {
          users,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });

    } catch (error) {
      console.error('List users error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante il recupero degli utenti',
          code: 'LIST_USERS_ERROR'
        }
      });
    }
  }

  /**
   * Get user by ID (Admin only)
   */
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: {
            message: 'ID utente richiesto',
            code: 'MISSING_USER_ID'
          }
        });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          restaurants: {
            select: {
              id: true,
              name: true,
              city: true,
              region: true,
              isActive: true
            }
          },
          workerProfiles: {
            select: {
              id: true,
              experience: true,
              isAvailable: true
            }
          }
        }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          error: {
            message: 'Utente non trovato',
            code: 'USER_NOT_FOUND'
          }
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { user }
      });

    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante il recupero dell\'utente',
          code: 'GET_USER_ERROR'
        }
      });
    }
  }

  /**
   * Update user status (Admin only)
   */
  static async updateUserStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          error: {
            message: 'ID utente richiesto',
            code: 'MISSING_USER_ID'
          }
        });
        return;
      }

      if (typeof isActive !== 'boolean') {
        res.status(400).json({
          success: false,
          error: {
            message: 'Campo isActive deve essere un booleano',
            code: 'INVALID_INPUT'
          }
        });
        return;
      }

      const user = await prisma.user.update({
        where: { id },
        data: { isActive },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true
        }
      });

      res.status(200).json({
        success: true,
        message: `Utente ${isActive ? 'attivato' : 'disattivato'} con successo`,
        data: { user }
      });

    } catch (error) {
      console.error('Update user status error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante l\'aggiornamento dello stato utente',
          code: 'UPDATE_USER_STATUS_ERROR'
        }
      });
    }
  }
}
