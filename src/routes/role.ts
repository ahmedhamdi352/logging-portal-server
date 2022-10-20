import express from 'express';
import roleController from '../controller/core/roleController';
const router = express.Router();

router.post('/', roleController.createRole);
router.put('/:roleId', roleController.updateRole);
router.post('/assignRole', roleController.assignRoleToUser);
router.delete('/:roleId', roleController.deleteRole);
router.get('/', roleController.getRoles);
router.get('/permissions', roleController.getPermissions);

export default router;
