import { RequestHandler } from 'express';
import typeRepository from '../../repository/types';
import { EHttpStatusCode } from '../../helper';
import project from '../../repository/project';
import allocation from '../../repository/allocation';

class TypesController {
  public getAllTypes: RequestHandler = async (req, res) => {
    try {
      const types = await typeRepository.findAll();
      return res.json(types);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public createType: RequestHandler = async (req, res) => {
    try {
      const newType = { ...req.body };
      const savedType = await typeRepository.create(newType);
      const type = await typeRepository.findOne({
        internalId: savedType.internalId,
      });
      return res.json(type);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public updateType: RequestHandler = async (req, res) => {
    const typeId = req.params.id;
    try {
      const { raw } = await typeRepository.update(
        { internalId: typeId },
        { ...req.body }
      );
      if (raw) {
        const type = await typeRepository.findOne({ internalId: typeId });
        return res.json(type);
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

  public deleteType: RequestHandler = async (req, res) => {
    const typeId = req.params.id;
    try {
      const type = await typeRepository.findOne({ internalId: typeId });
      if (!type)
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ error: 'Invalid Log ID.' });
      if (type) {
        const projects = await project.findAll({
          type: typeId,
        });
        // if (projects.length !== 0) {
        //   await projects.map(async (d) => {
        //     // console.log(item, 'projects');
        //     const allocations = await allocation.findAll({
        //       project: d.internalId,
        //     });
        //     if (allocations.length !== 0) {
        //       await allocations.map((item) => {
        //         console.log(item, 'allocation');
        //         item.remove();
        //       });
        //     }
        //     setTimeout(() => {
        //       d.remove();
        //     }, 1500);
        //   });
        // }
        type.remove();
        return res.json(type);
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
export default new TypesController();
