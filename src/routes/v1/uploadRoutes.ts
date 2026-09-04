import { Router } from 'express';
import { uploadMedia, handleBlobClientUpload } from '../../controllers/uploadController.js';

const router = Router();

// Server-side upload
router.route('/')
  .post(uploadMedia);

// Client-side direct upload handshake for large video/image files
router.route('/blob-auth')
  .post(handleBlobClientUpload);

export default router;
