import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import projectRoutes from './projectRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import sectorRoutes from './sectorRoutes.js';
import clientRoutes from './clientRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import contactRoutes from './contactRoutes.js';
import contentRoutes from './contentRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import themeRoutes from './themeRoutes.js';
import adminUserRoutes from './adminUserRoutes.js';
import auditLogRoutes from './auditLogRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/sectors', sectorRoutes);
router.use('/clients', clientRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/contact', contactRoutes);
router.use('/content', contentRoutes);
router.use('/upload', uploadRoutes);
router.use('/theme', themeRoutes);
router.use('/admin-users', adminUserRoutes);
router.use('/audit-logs', auditLogRoutes);

export default router;
