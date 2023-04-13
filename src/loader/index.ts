import { Application } from 'express';
import winstonLoader from './winston';
import expressLoader from './express';
import typeormLoader from './typeormLoader';
import defaultsLoader from './defaults';
import SocketIO from './socket';
import cronJobsLoader from './cronJobs';

import httpServer from '../server';

export default async (expressApp: Application) => {
  await winstonLoader();
  // await typeormLoader();
  // cronJobsLoader();
  // await defaultsLoader();
  expressLoader(expressApp);
  // SocketIO.init(httpServer);
};
