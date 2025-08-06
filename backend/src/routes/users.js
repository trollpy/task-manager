import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

router.get('/', authenticate, authorize(['Admin', 'Manager']), userController.getUsers);
router.get('/:id', authenticate, userController.getUser);
router.post('/', authenticate, authorize(['Admin']), validateUser, userController.createUser);
router.put('/:id', authenticate, authorize(['Admin']), validateUser, userController.updateUser);
router.delete('/:id', authenticate, authorize(['Admin']), userController.deleteUser);

export default router;