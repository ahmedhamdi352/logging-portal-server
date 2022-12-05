import { RequestHandler } from 'express';
import ProjectsRepository from '../../repository/project';
import { EHttpStatusCode } from '../../helper';
import allocation from '../../repository/allocation';
import { isEmpty } from 'lodash';
import { IUser } from '../../helper';

class ProjectController {
  public getAllProjects: RequestHandler = async (req, res) => {
    try {
      const types = await ProjectsRepository.findAll();
      const result = types.map((item) => {
        return {
          ...item,
          logTypes: isEmpty(item.logTypes) ? [] : item.logTypes.split(','),
        };
      });
      return res.json(result);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public getAllProjectsByIds: RequestHandler = async (req, res) => {
    const { internalId } = req.user as IUser;
    try {
      const allocations = await allocation.findAll({
        user: internalId,
      });
      const result = allocations.map((item) => {
        return {
          name: item.project?.name,
          internalId: item.project?.internalId,
          logTypes: item.project?.logTypes.split(','),
        };
      });
      return res.json(result);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public createProject: RequestHandler = async (req, res) => {
    try {
      const newProject = { ...req.body };
      const savedProject = await ProjectsRepository.create(newProject);
      const Project = await ProjectsRepository.findOne({
        internalId: savedProject.internalId,
      });
      return res.json(Project);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public updateProject: RequestHandler = async (req, res) => {
    const projectId = req.params.id;
    try {
      const { raw } = await ProjectsRepository.update(
        { internalId: projectId },
        { ...req.body }
      );
      if (raw) {
        const project = await ProjectsRepository.findOne({
          internalId: projectId,
        });
        return res.json(project);
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

  public deleteProject: RequestHandler = async (req, res) => {
    const projectId = req.params.id;
    try {
      const project = await ProjectsRepository.findOne({
        internalId: projectId,
      });
      if (!project)
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ error: 'Invalid Log ID.' });
      if (project) {
        const allocations = await allocation.findAll({
          project: projectId,
        });
        await allocations.map((item) => item.remove());
        project.remove();
        return res.json(project);
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
export default new ProjectController();
