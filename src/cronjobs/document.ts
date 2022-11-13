import cron from 'node-cron';
import documentController from '../controller/core/logsController';

export default class DocumentCronJob {
  public static currentJob: any;

  public static statJob(job: cron.ScheduledTask) {
    console.log('start job.');

    job.start();
  }
  public static stopJob(job: cron.ScheduledTask) {
    console.log('stop job.');
    job.stop();
  }

  public static destroyJob(job: cron.ScheduledTask) {
    if (job) {
      console.log('destroy job.');
      job.destroy();
    }
  }

  public static getCurrentJob() {
    return this.currentJob;
  }

  public static createJob(job: any) {
    console.log('creating new job.');
    let expression = `0 50 23 * * *`;
    this.currentJob = cron.schedule(expression, async () => {
      console.log('job', new Date());
      job();
    });
  }

  // called only when server starts
  public static async init() {
    DocumentCronJob.createJob(documentController.cronJobHandler);
  }
}
