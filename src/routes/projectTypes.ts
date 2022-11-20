import express from 'express';
import typesController from '../controller/core/projectTypesController';
import { authenticated } from '../middlewares';

const router = express.Router();

router.get('/', authenticated, typesController.getAllTypes);
router.post('/', authenticated, typesController.createType);
router.delete('/:id', authenticated, typesController.deleteType);
router.put('/:id', authenticated, typesController.updateType);

export default router;
