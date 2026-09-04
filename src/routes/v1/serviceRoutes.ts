import { Router } from 'express';
import { getServices, getServiceBySlug, createService, updateService, deleteService } from '../../controllers/serviceController.js';

const router = Router();

router.route('/')
  .get(getServices)
  .post(createService);

router.route('/id/:id')
  .put(updateService)
  .delete(deleteService);

router.route('/:slug')
  .get(getServiceBySlug);

export default router;
