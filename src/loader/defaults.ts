import async from 'async';
import winston from 'winston';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Role } from '../entity/Role';
import { Permission } from '../entity/Permission';
import { appPermissions } from '../helper';
import { Logs } from '../entity/logs';
import { ProjectType } from '../entity/projectType';
import { Project } from '../entity/project';
import { Allocation } from '../entity/allocation';

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
        return createTypes(callback);
      },

      function (callback) {
        return createProject(callback);
      },

      function (callback) {
        return createAllocation(callback);
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
    {
      firstName: 'abdelrhman',
      lastName: 'essam',
      username: 'abdelrhman',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'ahmed',
      lastName: 'hamdi',
      username: 'ahamdi',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'ahmed',
      lastName: 'hamdi',
      username: 'ahamdiiii',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      directManger: { internalId: 1 },
      isActive: true,
    },
    {
      firstName: 'mohamed',
      lastName: 'behairy',
      username: 'behairy',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'ahmed',
      lastName: 'younis',
      username: 'younis',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'dina',
      lastName: 'abdelhakam',
      username: 'dina',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'wessam',
      lastName: 'essam',
      username: 'wessam',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'fatma',
      lastName: 'ahmed',
      username: 'fatma',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'moamen',
      lastName: 'ragab',
      username: 'moamen',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'khaled',
      lastName: 'ahmed',
      username: 'khaled',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'hesham',
      lastName: 'ashraf',
      username: 'hesham',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'hussein',
      lastName: 'reda',
      username: 'hussein',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'salah',
      lastName: 'tarek',
      username: 'salah',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'ahmed',
      lastName: 'hassan',
      username: 'ahassan',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'neama',
      lastName: 'kamal',
      username: 'neama',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'shrouk',
      lastName: 'tarek',
      username: 'shrouk',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'mina',
      lastName: 'magdy',
      username: 'mina',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
      phone: '01025811013',
      role: { internalId: adminRole.internalId },
      isActive: true,
    },
    {
      firstName: 'ahmed',
      lastName: 'abdelmaboud',
      username: 'abdelmaboud',
      password: 'P@ssw0rd',
      email: 'abdelrhman@gmail.com',
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
      name: appPermissions.showAllCharts,
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

const createAllocation = async (callback) => {
  const repo = getRepository(Allocation);
  const data = [
    {
      month: 'may',
      project: { internalId: 4 },
      user: { internalId: 13 },
    },
    {
      month: 'may',
      project: { internalId: 12 },
      user: { internalId: 13 },
    },
  ];

  Promise.all(
    data.map(async (item) => {
      const itemFound = await repo.findOne({ month: item.month });
      if (!itemFound) {
        return repo.create(item).save();
      }
    })
  )
    .then(function (result) {
      winston.info(`allocation are created successfully.`);
      return callback();
    })
    .catch(function (err) {
      console.log(err);
      winston.info(`Error in creating allocation.`);
      return callback();
    });
};

const createProject = async (callback) => {
  const repo = getRepository(Project);
  const data = [
    {
      name: 'ZATCA-RE',
      type: { internalId: 3 },
    },
    {
      name: 'APPDYNMICS PARTNERSHIP',
      type: { internalId: 4 },
    },
    {
      name: 'CITC',
      type: { internalId: 2 },
    },
    {
      name: 'ALSEER',
      type: { internalId: 2 },
    },
    {
      name: 'BAB',
      type: { internalId: 3 },
    },
    {
      name: 'DataRobot-Partnership',
      type: { internalId: 4 },
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
      winston.info(`projects are created successfully.`);
      return callback();
    })
    .catch(function (err) {
      console.log(err);
      winston.info(`Error in creating projects.`);
      return callback();
    });
};

const createTypes = async (callback) => {
  const repo = getRepository(ProjectType);
  const data = [
    {
      name: 'Prod',
      color: '#a0f7d1',
    },
    {
      name: 'Poc',
      color: '#ef58e5',
    },
    {
      name: 'Lear',
      color: '#0030f2',
    },
    {
      name: 'Supp',
      color: '#eded8b',
    },
    {
      name: 'Blank',
      color: '#9e9e93',
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
      winston.info(`project types are created successfully.`);
      return callback();
    })
    .catch(function (err) {
      console.log(err);
      winston.info(`Error in creating project types.`);
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
      date: new Date(),
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
