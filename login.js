require('dotenv').config();

module.exports = async function login(page) {
  //This waits and goes to the handshake link
  try {
    await page.goto('https://app.joinhandshake.com/login');

    //this selects the area where i have to type my school name it
    await page.waitForSelector('.select2-choice');
    await page.click('.select2-choice');

    //this waits for the drop down menu and types in the name of the university and clicks on it
    await page.waitForSelector('.select2-input');
    await page.type('.select2-input', 'Arizona State University');
    await page.waitForSelector('.select2-result-label');
    await page.click('.select2-result-label');


    //this waits for the page to load and click on the button 
    await page.waitForSelector('.sso-button');
    await page.click('.sso-button');

    //this waits for my inputs on my school page and types in my username and password
    await page.waitForSelector('#username');
    await page.type('#username', 'dkberko');
    await page.waitForSelector('#password');
    await page.type('#password', 'B0279905426d');

    //this means that all the inputs are done and it procceeds to click on the submit
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('.btn-submit')
    ]);
     
    // //this waits for the duo mfa
    await page.waitForSelector('iframe');
    const duoFrame = await page.frames().find(frame => frame.url().includes('duo.com'));

    await duoFrame.waitForSelector('#auth_methods .push');
    await duoFrame.click('#auth_methods .push');

    console.log('Please approve Duo Push on your phone.');
    await page.waitForTimeout(60000);


    //resend you back the handshake website
    // await page.goto('https://app.joinhandshake.com/login');
    console.log('Login successful, redirected to Handshake.');
  } catch (error) {
    console.error('Error during login:', error);
  }
};

