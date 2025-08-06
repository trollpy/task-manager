import express from 'express';
import * as organizationController from '../controllers/organizationController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/logos/' });

router.get('/', authenticate, organizationController.getOrganization);
router.put('/', authenticate, authorize(['Admin']), organizationController.updateOrganization);
router.post('/logo', authenticate, authorize(['Admin']), upload.single('logo'), organizationController.uploadLogo);

export default router;