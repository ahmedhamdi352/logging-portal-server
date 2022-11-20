import express from 'express';
import AllocationController from '../controller/core/allocation';
import { authenticated } from '../middlewares';

const router = express.Router();

router.get('/', authenticated, AllocationController.getAllAllocation);
router.post('/', authenticated, AllocationController.createAllocation);
router.delete('/:id', authenticated, AllocationController.deleteAllocation);
router.put('/:id', authenticated, AllocationController.updateAllocation);

export default router;
