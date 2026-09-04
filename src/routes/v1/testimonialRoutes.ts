import { Router } from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../controllers/testimonialController.js';

const router = Router();

router.route('/')
  .get(getTestimonials)
  .post(createTestimonial);

router.route('/id/:id')
  .put(updateTestimonial)
  .delete(deleteTestimonial);

export default router;
