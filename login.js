module.exports = async function login(page) {
  // Go to Handshake login page
  await page.goto('https://app.joinhandshake.com/login');

  //find the dropdown first
  await page.waitForSelector('.select2-choice')
  await page.click('.select2-choice')

  

  //find asu
  await page.waitForSelector('.select2-input')
  await page.type('.select2-input', 'Arizona State University')
  await page.waitForSelector('.select2-result-label')
  await page.click('.select2-result-label')

  // Wait for the SSO login button (adjust based on the actual selector of the button on the Handshake page)
  await page.waitForSelector('.sso-button');
  await page.click('.sso-button'); // Click the SSO login link/button

  // Wait for ASU login page
  // await page.waitForNavigation();

  // Enter ASU credentials (Adjust the selectors according to ASU's login page)
  await page.waitForSelector('#username');
  await page.type('#username', 'dkberko');
  await page.waitForSelector('#password');
  await page.type('#password', 'B0279905426d');

  // Click the submit button (adjust if the selector is different)
  await page.click('.btn-submit');

  // Wait for Duo Push screen to load (if any)
  await page.waitForSelector('iframe'); // Duo push usually appears in an iframe

  // Switch to the Duo iFrame (find the correct frame containing Duo)
  const duoFrame = await page.frames().find(frame => frame.url().includes('duo.com'));

  // Wait for the Duo Push button and click it (inside the iframe)
  await duoFrame.waitForSelector('#auth_methods .push');
  await duoFrame.click('#auth_methods .push'); // Send a push

  // Wait for the user to confirm Duo Push manually
  console.log('Please approve Duo Push on your phone.');
  await page.waitForTimeout(60000); // Wait for 60 seconds for manual approval

  // Wait for redirection back to Handshake after Duo Push is approved

  await page.goto('https://app.joinhandshake.com/login')
  // await page.waitForTimeout(60000)
  // await page.waitForNavigation({ waitUntil: 'networkidle0' });

  console.log('Login successful, redirected to Handshake.');
};
  