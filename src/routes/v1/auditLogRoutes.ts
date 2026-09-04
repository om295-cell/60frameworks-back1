import { Router } from 'express';
import { getLogs, createLog } from '../../controllers/auditLogController.js';

const router = Router();

router.route('/')
  .get(getLogs)
  .post(createLog);

export default router;
