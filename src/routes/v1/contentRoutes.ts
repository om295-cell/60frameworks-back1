import { Router } from 'express';
import { getContent, updateContent } from '../../controllers/contentController.js';

const router = Router();

router.route('/').get(getContent).put(updateContent).post(updateContent);

export default router;
