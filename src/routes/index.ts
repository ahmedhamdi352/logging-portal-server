import express from 'express';
import userRoutes from './user';
import roleRoutes from './role';
import logsRoutes from './logs';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/roles', roleRoutes);
router.use('/logs', logsRoutes);

export default router;
