import { Project } from '../entity/project';
import { getRepository } from 'typeorm';

class ProjectsRepository {
  async findOne(where = {}, relations = []): Promise<Project> {
    return await Project.findOne(where, { relations });
  }

  async findAll(where = {}): Promise<Project[]> {
    return await Project.find({
      where,
      select: ['internalId', 'name', 'isActive'],
      relations: ['type'],
      order: { internalId: 'ASC' },
    });
  }

  async create(data: {}): Promise<Project> {
    return await getRepository(Project).create(data).save();
  }

  async update(criteria: any, updatedColumns: object) {
    return await Project.update(criteria, updatedColumns);
  }
}

export default new ProjectsRepository();
