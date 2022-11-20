import { Allocation } from '../entity/allocation';
import { getRepository } from 'typeorm';

class AllocationsRepository {
  async findOne(where = {}, relations = []): Promise<Allocation> {
    return await Allocation.findOne(where, { relations });
  }

  async findAll(where = {}): Promise<Allocation[]> {
    return await Allocation.find({
      where,
      select: ['internalId', 'month'],
      relations: ['user', 'project'],
      order: { internalId: 'ASC' },
    });
  }

  async create(data: {}): Promise<Allocation> {
    return await getRepository(Allocation).create(data).save();
  }

  async update(criteria: any, updatedColumns: object) {
    return await Allocation.update(criteria, updatedColumns);
  }
}

export default new AllocationsRepository();
