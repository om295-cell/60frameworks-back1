import { Router } from 'express';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../../controllers/projectController.js';

const router = Router();

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/id/:id')
  .put(updateProject)
  .delete(deleteProject);

router.route('/:slug')
  .get(getProjectBySlug);

export default router;
