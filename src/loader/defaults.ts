import async from 'async';
import winston from 'winston';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Role } from '../entity/Role';
import { Permission } from '../entity/Permission';
import { appPermissions } from '../helper';
import { Logs } from '../entity/logs';

export default async () => {
  winston.info('Checking Default Settings...');
  async.waterfall(
    [
      function (callback) {
        return createPermissions(callback);
      },
      function (callback) {
        return createRoles(callback);
      },
      function (callback) {
        return createUsers(callback);
      },
      function (callback) {
        return createLogs(callback);
      },
    ],
    function (err) {
      if (err) winston.warn(err);
    }
  );
};

const createUsers = async (callback) => {
  const repo = getRepository(User);
  const adminRole = await getRepository(Role).findOne({ name: 'admin' });

  const users = [
    // {
    //   firstName: 'ahmed',
    //   lastName: 'hamdi',
    //   username: 'ahamdi',
    //   password: 'P@ssw0rd',
    //   email: 'ahmedhamdi352@gmail.com',
    //   phone: '01025811914',
    //   role: { internalId: saleRole.internalId },
    //   isActive: true,
    // },
    // {
    //   firstName: 'sam',
    //   lastName: 'hamdi',
    //   username: 'shamdi',
    //   password: 'P@ssw0rd',
    //   email: 'ahmedhamdi352@gmail.com',
    //   phone: '01025811910',
    //   role: { internalId: financeRole.internalId },
    //   isActive: true,
    // },
    // {
    //   firstName: 'sam',
    //   lastName: 'hamdi',
    //   username: 'test',
    //   password: 'P@ssw0rd',
    //   email: 'ahmedhamdi352@gmail.com',
    //   phone: '01025811911',
    //   role: { internalId: financeRole.internalId },
    //   isActive: true,
    // },
    {
      firstName: 'System',
      lastName: 'User',
      username: 'sysuserr',
      password: 'P@ssw0rd',
      email: 'ahmedhamdi351@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
  ];

  Promise.all(
    users.map(async (u) => {
      const user = await repo.findOne({ username: u.username });
      if (!user) {
        return repo.create(u).save();
      }
    })
  )
    .then(function (result) {
      winston.info(`users are created successfully.`);
      return callback();
    })
    .catch(function (err) {
      console.log(err);
      winston.info(`Error in creating users.`);
      return callback();
    });
};

const createPermissions = async (callback) => {
  const repo = getRepository(Permission);
  const data = [
    {
      name: appPermissions.addUsers,
    },
    {
      name: appPermissions.updateUsers,
    },
    {
      name: appPermissions.deleteUsers,
    },
    {
      name: appPermissions.manageRoles,
    },
    {
      name: appPermissions.showTeamCharts,
    },
    {
      name: appPermissions.showCharts,
    },
    {
      name: appPermissions.manageTeam,
    },
  ];
  return Promise.all(
    data.map(async (element) => {
      const item = await repo.findOne({ name: element.name });
      if (!item) {
        return repo.create(element).save();
      }
    })
  )
    .then(function (result) {
      winston.info(`Permissions are created successfully.`);
      return callback();
    })
    .catch(function (err) {
      console.log(err);
      winston.info(`Error in creating permissions.`);
      return callback();
    });
};

const createRoles = async (callback) => {
  const repo = getRepository(Role);
  const permissionsRepo = getRepository(Permission);
  const permissionsList = await permissionsRepo.find();
  const data = [
    {
      name: 'admin',
      default: true,
      permissions: permissionsList,
    },
    {
      name: 'manger',
      default: true,
      permissions: permissionsList.filter((perm) =>
        [
          'addUsers',
          'updateUsers',
          'delete_users',
          'showTeamCharts',
          'manageTeam',
        ].includes(perm.name)
      ),
    },
    {
      name: 'employee',
      default: true,
      permissions: permissionsList.filter((perm) =>
        ['addLog'].includes(perm.name)
      ),
    },
  ];

  Promise.all(
    data.map(async (item) => {
      const itemFound = await repo.findOne({ name: item.name });
      if (!itemFound) {
        return repo.create(item).save();
      }
    })
  )
    .then(function (result) {
      winston.info(`Roles are created successfully.`);
      return callback();
    })
    .catch(function (err) {
      console.log(err);
      winston.info(`Error in creating roles.`);
      return callback();
    });
};

const createLogs = async (callback) => {
  const repo = getRepository(Logs);
  const data = [
    {
      day: 'Sunday',
      date: '3-Apr',
      knowledgeSharing: 0,
      teamMeetings: 0,
      dailyStandup: 0,
      collaboration: 0,
      learning: 30,
      planned: 300,
      externalSupport: 0,
      internalSupport: 0,
      support: 0,
      manHour: 7.15,
      user: { internalId: 1 },
    },
  ];

  Promise.all(
    data.map(async (item) => {
      return repo.create(item).save();
    })
  )
    .then(function (result) {
      winston.info(`logs are created successfully.`);
      return callback();
    })
    .catch(function (err) {
      console.log(err);
      winston.info(`Error in creating logs.`);
      return callback();
    });
};
