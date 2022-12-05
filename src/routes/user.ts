import express from 'express';
import userContoller from '../controller/core/userContoller';
// import { authenticated } from '../middlewares';
import {
  loginValidation,
  changePasswordValidation,
  createUserValidation,
  updateUserValidation,
} from '../validation/user';
import { authenticated } from '../middlewares';

const router = express.Router();

router.post('/login', loginValidation, userContoller.login);
router.post(
  '/changepassword',
  authenticated,
  changePasswordValidation,
  userContoller.changePassword
);
router.get('/', userContoller.getAllUsers);
router.get('/admin', userContoller.getAllAdmins);
router.get('/receptionist', userContoller.getAllreceptionist);

router.post('/', createUserValidation, userContoller.createUser);
router.delete('/:userId', userContoller.deleteUser);
router.put('/:userId', updateUserValidation, userContoller.updateUser);
router.get('/getRelatedUser', authenticated, userContoller.getRelatedUser);
router.get('/Mangers', authenticated, userContoller.getAllMangers);

export default router;
