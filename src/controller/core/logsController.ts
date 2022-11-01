import { RequestHandler } from 'express';
import { IUser } from '../../helper';
import { User } from '../../entity/User';
import logsRepository from '../../repository/logs';
import { EHttpStatusCode, appPermissions } from '../../helper';
import { getRepository } from 'typeorm';
import { Logs } from '../../entity/logs';

class LogsController {
  public getAllLogs: RequestHandler = async (req, res) => {
    try {
      const { internalId } = req.user as IUser;
      const logs = await logsRepository.findAll({ user: internalId });
      return res.json(logs);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public createLog: RequestHandler = async (req, res) => {
    try {
      const newLog = { ...req.body };
      const checkLog = await logsRepository.findOne({ date: newLog.date });
      if (checkLog) {
        return res
          .status(400)
          .json({ error: 'You already have a log on this date' });
      } else {
        const savedLog = await logsRepository.create(newLog);
        const user = await logsRepository.findOne(
          { internalId: savedLog.internalId },
          ['user']
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

  public createLogs: RequestHandler = async (req, res) => {
    try {
      const data = { ...req.body };
      console.log(data?.res, data?.res?.length);
      Promise.all(
        data?.res?.map(async (u: {}) => {
          return (await logsRepository.create(u)).save();
        })
      )
        .then(function (result) {
          return res.json(result);
        })
        .catch(function (error) {
          console.log('catch_error', error);
          return res
            .status(500)
            .json({ error: 'There might be a problem. Please, try again.' });
        });
      // const checkLog = await logsRepository.findOne({ date: newLog.date });
      // if (checkLog) {
      //   return res
      //     .status(400)
      //     .json({ error: 'You already have a log on this date' });
      // } else {
      //   const savedLog = await logsRepository.create(newLog);
      //   const user = await logsRepository.findOne(
      //     { internalId: savedLog.internalId },
      //     ['user']
      //   );
      //   return res.json(user);
      // }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };
}
export default new LogsController();
