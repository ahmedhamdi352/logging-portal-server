import { Logs } from '../entity/logs';
import { IRole } from '../helper';
import { getRepository, FindOneOptions } from 'typeorm';

class LogsRepository {
  async findOne(where = {}, relations = []): Promise<Logs> {
    return await Logs.findOne(where, { relations });
  }

  async findAll(where = {}): Promise<Logs[]> {
    return await Logs.find({
      where,
      select: [
        'internalId',
        'day',
        'date',
        'knowledgeSharing',
        'dailyStandup',
        'teamMeetings',
        'collaboration',
        'learning',
        'planned',
        'externalSupport',
        'internalSupport',
        'support',
        'manHour',
      ],
      relations: ['user'],
      order: { internalId: 'ASC' },
    });
  }

  async create(data: {}): Promise<Logs> {
    return await getRepository(Logs).create(data).save();
  }
}

export default new LogsRepository();
