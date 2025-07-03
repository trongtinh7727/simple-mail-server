const nodemailer = require('nodemailer');

// Create a test account
async function main() {
  // Create a SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'localhost', // Change to your server IP if testing from another machine
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Test Sender" <sender@example.com>',
    to: 'test@iiex.tech',
    subject: 'Test Email ✔',
    text: 'This is a test email sent to the mail server',
    html: '<b>This is a test email</b> sent to the <i>mail server</i>'
  });

  console.log('Message sent: %s', info.messageId);
}

main().catch(console.error);
