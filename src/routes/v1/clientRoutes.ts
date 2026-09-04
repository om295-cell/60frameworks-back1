import { Router } from 'express';
import { getClients, createClient, updateClient, deleteClient } from '../../controllers/clientController.js';

const router = Router();

router.route('/')
  .get(getClients)
  .post(createClient);

router.route('/id/:id')
  .put(updateClient)
  .delete(deleteClient);

export default router;
