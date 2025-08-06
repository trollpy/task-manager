import express from 'express';
import * as reportController from '../controllers/reportController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authenticate, reportController.getDashboardStats);
router.get('/performance', authenticate, authorize(['Admin', 'Manager']), reportController.getPerformanceReport);
router.get('/tasks', authenticate, authorize(['Admin', 'Manager']), reportController.getTaskAnalytics);
router.post('/export', authenticate, authorize(['Admin', 'Manager']), reportController.exportReport);

export default router;