import { Router } from 'express';
import { submitContact, contactSchema, getSubmissions, updateSubmissionStatus } from '../../controllers/contactController.js';
import { validateRequest } from '../../middleware/validateRequest.js';

const router = Router();

router.route('/')
  .post(validateRequest(contactSchema), submitContact);

router.route('/submissions')
  .get(getSubmissions);

router.route('/submissions/:id')
  .put(updateSubmissionStatus);

export default router;
