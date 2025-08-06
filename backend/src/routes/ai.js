import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/suggest-assignee', authenticate, authorize(['Admin', 'Manager']), aiController.suggestAssignee);
router.get('/insights', authenticate, aiController.getInsights);
router.post('/generate-summary', authenticate, authorize(['Admin', 'Manager']), aiController.generateSummary);

export default router;