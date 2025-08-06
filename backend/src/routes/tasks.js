import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateTask } from '../middleware/validation.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/tasks/' });

router.get('/', authenticate, taskController.getTasks);
router.get('/:id', authenticate, taskController.getTask);
router.post('/', authenticate, authorize(['Admin', 'Manager']), validateTask, taskController.createTask);
router.put('/:id', authenticate, validateTask, taskController.updateTask);
router.delete('/:id', authenticate, authorize(['Admin', 'Manager']), taskController.deleteTask);
router.post('/:id/accept', authenticate, taskController.acceptTask);
router.post('/:id/reject', authenticate, taskController.rejectTask);
router.post('/:id/files', authenticate, upload.array('files'), taskController.uploadFiles);
router.get('/:id/files', authenticate, taskController.getTaskFiles);

export default router;