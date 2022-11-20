import express from 'express';
import projectController from '../controller/core/projectController';
import { authenticated } from '../middlewares';

const router = express.Router();

router.get('/', authenticated, projectController.getAllProjects);
router.post('/', authenticated, projectController.createProject);
router.delete('/:id', authenticated, projectController.deleteProject);
router.put('/:id', authenticated, projectController.updateProject);

export default router;
