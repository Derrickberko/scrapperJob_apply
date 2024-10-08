// Creaating variables 
//this is a library used to control the browser
const puppeteer = require('puppeteer')
//a variable to handle the login
const login = require('./login')
//scrapping the jobs
const scrapeJobs = require('./scrapeJobs')
//Apply for the jobs
const applyJobs = require('./applyJobs')
//schedule to apply for the job
const scheduleler = require('./scheduleler')

(async () =>{
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  //Log in to handshake
  await login(page)

  //scrape Jobs
  const jobs = await scrapeJobs(page)

  //apply for jobs
  for(const job of jobs){
    await applyJobs(page, job.link)
  }
  await browser.close()
})