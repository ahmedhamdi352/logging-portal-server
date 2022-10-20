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
router.get('/finance', userContoller.getAllfinance);

router.post('/', createUserValidation, userContoller.createUser);
router.delete('/delete/:userId', userContoller.deleteUser);
router.put('/:userId', updateUserValidation, userContoller.updateUser);

export default router;
