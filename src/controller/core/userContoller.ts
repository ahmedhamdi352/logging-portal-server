import { RequestHandler } from 'express';
import { IUser } from '../../helper';
import { User } from '../../entity/User';
import userRepository from '../../repository/user';
import { EHttpStatusCode, appPermissions } from '../../helper';
import { getRepository } from 'typeorm';
import { Role } from '../../entity/Role';
import allocation from '../../repository/allocation';

class UserController {
  public login: RequestHandler = async (req, res) => {
    try {
      const { username, password } = req.body;
      let user = await userRepository.findOne({ username, isActive: true }, [
        'role',
        'role.permissions',
        'directManger',
      ]);
      if (user) {
        const isPasswordMatch = user.validatePassword(password);
        if (isPasswordMatch) {
          const userToken = user.generateAuthToken();
          return res.json({
            token: 'Bearer ' + userToken,
          });
        } else {
          return res.status(400).json({ error: 'Invalid user credential' });
        }
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public changePassword: RequestHandler = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { internalId } = req.user as IUser;
      const user = await userRepository.findOne({ internalId });
      if (user) {
        const isPasswordMatch = user.validatePassword(oldPassword);
        if (isPasswordMatch) {
          user.password = user.hashPassword(newPassword);
          const userSaved = await user.save();
          if (userSaved) {
            return res.json({ msg: 'User updated' });
          } else {
            return res
              .status(400)
              .json({ error: 'Something wrong when updating user' });
          }
        } else {
          return res.status(400).json({ error: 'Incorrect old password' });
        }
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public getAllUsers: RequestHandler = async (req, res) => {
    try {
      const financeRole = await getRepository(Role).findOne({
        name: 'finance',
      });

      const users = await userRepository.findAll({
        role: { internalId: financeRole.internalId },
      });
      return res.json(users);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public getAllAdmins: RequestHandler = async (req, res) => {
    try {
      const AdminRole = await getRepository(Role).findOne({ name: 'admin' });

      const users = await userRepository.findAll({
        role: { internalId: AdminRole.internalId },
      });
      return res.json(users);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public getAllreceptionist: RequestHandler = async (req, res) => {
    try {
      const AdminRole = await getRepository(Role).findOne({ name: 'sales' });

      const users = await userRepository.findAll({
        role: { internalId: AdminRole.internalId },
      });
      return res.json(users);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public getAllMangers: RequestHandler = async (req, res) => {
    try {
      const MangerRole = await getRepository(Role).findOne({ name: 'manger' });
      const adminRole = await getRepository(Role).findOne({
        name: 'admin',
      });

      const mangerusers = await userRepository.findAll({
        role: { internalId: MangerRole.internalId },
      });
      const adminUsers = await userRepository.findAll({
        role: { internalId: adminRole.internalId },
      });
      return res.json([...mangerusers, ...adminUsers]);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public createUser: RequestHandler = async (req, res) => {
    try {
      const exsistUser = await userRepository.findOne({
        username: req.body.username,
      });
      if (exsistUser) {
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ error: 'username already exist' });
      } else {
        const newUser = {
          ...req.body,
          role: {
            internalId: req.body.role,
          },
          directManger: { internalId: req.body.directManger },
        };
        const savedUser = await userRepository.create(newUser);
        const user = await userRepository.findOne(
          { internalId: savedUser.internalId },
          ['role']
        );
        return res.json(user);
      }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };
  public getUsersBasedRole: RequestHandler = async (req, res) => {};
  public getRelatedUser: RequestHandler = async (req, res) => {
    try {
      const reqUser = req.user as User;
      if (reqUser?.role?.name === 'admin') {
        const users = await userRepository.findAll({});
        return res.json(users);
      } else {
        const users = await userRepository.findAll({
          directManger: { internalId: reqUser?.internalId },
        });
        return res.json(users);
      }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public updateUser: RequestHandler = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { raw } = await userRepository.update(
        { internalId: userId },
        { ...req.body }
      );
      if (raw) {
        const user = await userRepository.findOne(
          { internalId: userId },
          ['role', 'directManger'],
          [
            'internalId',
            'firstName',
            'lastName',
            'email',
            'username',
            'phone',
            'speciality',
            'isActive',
            'role',
            'directManger',
          ]
        );
        return res.json(user);
      } else {
        return res
          .status(500)
          .json({ error: 'There might be a problem. Please, try again.' });
      }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };
  public deleteUser: RequestHandler = async (req, res) => {
    try {
      const reqUser = req.user as User;
      const userId = req.params.userId;
      const user = await userRepository.findOne({ internalId: userId });
      if (!user)
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ error: 'Invalid User ID.' });
      if (user) {
        const allocations = await allocation.findAll({
          user: { internalId: userId },
        });
        if (allocations.length !== 0) {
          await allocations.map((item) => item.remove());
        }
        user.remove();
        return res.json(user);
      } else {
        return res
          .status(500)
          .json({ error: 'There might be a problem. Please, try again.' });
      }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };
}
export default new UserController();
