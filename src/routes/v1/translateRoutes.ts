import { Router } from 'express';
import { translate, translateBatch } from '../../controllers/translateController.js';

const router = Router();

router.post('/', translate);
router.post('/batch', translateBatch);

export default router;
