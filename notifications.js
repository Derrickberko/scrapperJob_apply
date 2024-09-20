const nodemailer = require('nodemailer');

module.exports = async function sendNotification(jobTitle) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  let mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com',
    subject: `Job Application Submitted: ${jobTitle}`,
    text: `You successfully applied for the position: ${jobTitle}`,
  };

  await transporter.sendMail(mailOptions);
  console.log('Notification sent for:', jobTitle);
};
