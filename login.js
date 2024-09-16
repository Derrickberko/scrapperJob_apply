module.exports = async function login(page) {
  await page.goto('https://app.joinhandshake.com/login')


  // Wait for the SSO login button/link and click it to go to the ASU login page
  await page.waitForSelector('button#sso-login'); // Adjust selector based on actual page
  await page.click('button#sso-login'); // Click to redirect to the ASU login page

  // Wait for the ASU login page to load
  await page.waitForNavigation();

  // Enter ASU credentials
  await page.waitForSelector('input[name="username"]'); // Adjust selector based on ASU login page
  await page.type('input[name="username"]', 'dkberko');
  await page.type('input[name="password"]', 'B0279905426d');

  // Submit the form
  await page.waitForSelector('button#sso-login', { timeout: 60000000 }); // 60 seconds


  // Wait for the navigation back to Handshake
  await page.waitForNavigation();

}