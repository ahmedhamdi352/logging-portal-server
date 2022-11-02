import express from 'express';
import logsController from '../controller/core/logsController';
import { authenticated } from '../middlewares';

const router = express.Router();

router.get('/', authenticated, logsController.getAllLogs);
router.post('/', authenticated, logsController.createLog);
router.post('/logs', authenticated, logsController.createLogs);
router.delete('/logs/:id', authenticated, logsController.deleteLog);

export default router;
