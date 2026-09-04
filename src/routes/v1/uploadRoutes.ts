import { Router } from 'express';
import { uploadMedia } from '../../controllers/uploadController.js';

const router = Router();

router.route('/')
  .post(uploadMedia);

export default router;
