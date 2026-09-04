import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser, loginAdmin } from '../../controllers/adminUserController.js';

const router = Router();

router.route('/login')
  .post(loginAdmin);

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .put(updateUser)
  .delete(deleteUser);

export default router;
