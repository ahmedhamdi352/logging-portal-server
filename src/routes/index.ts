import express from 'express';
import userRoutes from './user';
import roleRoutes from './role';
import logsRoutes from './logs';
import projectTypesRoutes from './projectTypes';
import projectsRoutes from './project';
import allocationRoutes from './allocation';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/roles', roleRoutes);
router.use('/logs', logsRoutes);
router.use('/types', projectTypesRoutes);
router.use('/project', projectsRoutes);
router.use('/allocation', allocationRoutes);

export default router;
