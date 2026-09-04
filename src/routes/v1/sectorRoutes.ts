import { Router } from 'express';
import { getSectors, getSectorBySlug, createSector, updateSector, deleteSector } from '../../controllers/sectorController.js';

const router = Router();

router.route('/')
  .get(getSectors)
  .post(createSector);

router.route('/id/:id')
  .put(updateSector)
  .delete(deleteSector);

router.route('/:slug')
  .get(getSectorBySlug);

export default router;
