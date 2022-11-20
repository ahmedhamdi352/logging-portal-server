import { ProjectType } from '../entity/projectType';
import { getRepository } from 'typeorm';

class TypesRepository {
  async findOne(where = {}, relations = []): Promise<ProjectType> {
    return await ProjectType.findOne(where, { relations });
  }

  async findAll(where = {}): Promise<ProjectType[]> {
    return await ProjectType.find({
      where,
      select: ['internalId', 'name', 'color'],
      order: { internalId: 'ASC' },
    });
  }

  async create(data: {}): Promise<ProjectType> {
    return await getRepository(ProjectType).create(data).save();
  }

  async update(criteria: any, updatedColumns: object) {
    return await ProjectType.update(criteria, updatedColumns);
  }
}

export default new TypesRepository();
