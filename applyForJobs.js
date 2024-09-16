module.exports = async function applyForJob(page, jobLink) {
  await page.goto(jobLink);
  const applyButton = await page.$('button.apply');
  
  if (applyButton) {
    await applyButton.click();
    await page.type('#resume', '/path/to/your/resume.pdf');
    await page.type('#coverLetter', 'Your cover letter content here.');
    await page.click('button.submit');
    console.log('Job application submitted for: ', jobLink);
  }
};
