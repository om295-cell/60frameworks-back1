import { Router } from 'express';
import { getTheme, updateTheme } from '../../controllers/themeController.js';

const router = Router();

router.route('/')
  .get(getTheme)
  .put(updateTheme);

export default router;
