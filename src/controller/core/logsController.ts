import { RequestHandler } from 'express';
import { IUser } from '../../helper';
import logsRepository from '../../repository/logs';
import usersRepository from '../../repository/user';
import { EHttpStatusCode } from '../../helper';
import moment from 'moment';

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

  public cronJobHandler = async () => {
    const day = moment().format('DD-MMM');
    const users = await usersRepository.findAll({});
    if (users.length !== 0) {
      users.map(async (user) => {
        const log = await logsRepository.findOne({
          date: day,
          user: { internalId: user?.internalId },
        });
        if (!log) {
          await logsRepository.create({
            day: moment().format('dddd'),
            date: moment(),
            knowledgeSharing: 0,
            teamMeetings: 0,
            dailyStandup: 0,
            collaboration: 0,
            learning: 0,
            planned: 0,
            externalSupport: 0,
            internalSupport: 0,
            support: 0,
            manHour: 0,
            user: { internalId: user?.internalId },
          });
        }
      });
    }
  };

  public createLog: RequestHandler = async (req, res) => {
    try {
      const newLog = { ...req.body };
      //future work
      const allLogs = await logsRepository.findAll({
        // date: newLog.date,
        user: { internalId: newLog.user?.internalId },
      });
      if (allLogs) {
        const checkLog = allLogs.filter(
          (item) => moment(item.date).format('YYYY-MM-DD') === newLog.date
        );
        if (checkLog.length !== 0) {
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
      }
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public updateLog: RequestHandler = async (req, res) => {
    const logID = req.params.id;
    try {
      const { raw } = await logsRepository.update(
        { internalId: logID },
        { ...req.body }
      );
      if (raw) {
        const log = await logsRepository.findOne({ internalId: logID });
        return res.json(log);
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

  public deleteLog: RequestHandler = async (req, res) => {
    const logID = req.params.id;
    try {
      const log = await logsRepository.findOne({ internalId: logID });
      if (!log)
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ error: 'Invalid Log ID.' });
      if (log) {
        log.remove();
        return res.json(log);
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

  public createLogs: RequestHandler = async (req, res) => {
    try {
      const data = { ...req.body };
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
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };
}
export default new LogsController();
