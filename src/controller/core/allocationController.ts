import { RequestHandler } from 'express';
import AllocationsRepository from '../../repository/allocation';
import { EHttpStatusCode } from '../../helper';

class AllocationController {
  public getAllAllocation: RequestHandler = async (req, res) => {
    try {
      const allocation = await AllocationsRepository.findAll();
      return res.json(allocation);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public createAllocation: RequestHandler = async (req, res) => {
    try {
      const newAllocation = { ...req.body };
      const savedProject = await AllocationsRepository.create(newAllocation);
      const allocation = await AllocationsRepository.findOne({
        internalId: savedProject.internalId,
      });
      return res.json(allocation);
    } catch (error) {
      console.log('catch_error', error);
      return res
        .status(500)
        .json({ error: 'There might be a problem. Please, try again.' });
    }
  };

  public updateAllocation: RequestHandler = async (req, res) => {
    const projectId = req.params.id;
    try {
      const { raw } = await AllocationsRepository.update(
        { internalId: projectId },
        { ...req.body }
      );
      if (raw) {
        const allocation = await AllocationsRepository.findOne({
          internalId: projectId,
        });
        return res.json(allocation);
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

  public deleteAllocation: RequestHandler = async (req, res) => {
    const allocationID = req.params.id;
    try {
      const allocation = await AllocationsRepository.findOne({
        internalId: allocationID,
      });
      if (!allocation)
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ error: 'Invalid Log ID.' });
      if (allocation) {
        allocation.remove();
        return res.json(allocation);
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
export default new AllocationController();
