module.exports = async function scrapeJobs(page) {
  //array to store jobs
  const jobs =[]

  //navigate to the job listings
  await page.goto('https://app.joinhandshake.com/stu/postings')
  await page.waitForSelector('#3fba69f9-4fbe-417d-b206-f02332a8016b-input');
    await page.type('.sc-ewvfha daEcKH', 'Information Technology Internship');
  

    // Wait for the job listing elements to be visible on the page
    
    await page.waitForSelector('.link-badge-container');

     // Use $$eval to evaluate a function in the context of the page
  const jobListings = await page.$$eval('.job-listing', listings => {
    return listings.map(listing => {
      // Extract job details from each listing
      const title = listing.querySelector('.job-title').innerText;
      const company = listing.querySelector('.company-name').innerText;
      const link = listing.querySelector('a').href;
      return { title, company, link }; // Return an object with the job details
    });
  });

  jobs.push(...jobListings); // Add the scraped job listings to the jobs array

  console.log(jobs); // Log the scraped job listings for debugging

  return jobs; // Return the array of job listings
}