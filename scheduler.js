const cron = require('node-cron');
const puppeteer = require('puppeteer');
const login = require('./login');
const scrapeJobs = require('./scrapeJobs');
const applyForJob = require('./applyForJob');
const sendNotification = require('./notifications');

cron.schedule('0 9 * * *', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await login(page);
  const jobs = await scrapeJobs(page);
  
  for (const job of jobs) {
    await applyForJob(page, job.link);
    await sendNotification(job.title);
  }
  
  await browser.close();
});
