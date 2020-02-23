module.exports = {
  providers: {
    mailgun: {
      domain: process.env.MAILGUN_DOMAIN,
      apiKey: process.env.MAILGUN_API_KEY,
      from: process.env.MAILGUN_FROM,
    },
    sendgrid: {
      domain: process.env.SENDGRID_DOMAIN,
      apiKey: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
    },
  },
};
