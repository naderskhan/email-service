module.exports = {
  providers: {
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      from: process.env.MAILGUN_FROM,
    },
    mailjet: {
      apiKey: [
        process.env.MAILJET_API_KEY_PUBLIC,
        process.env.MAILJET_API_KEY_PRIVATE,
      ],
      domain: '',
      from: process.env.MAILJET_FROM,
    },
    sendinblue: {
      apiKey: process.env.SENDINBLUE_API_KEY,
      domain: '',
      from: process.env.SENDINBLUE_FROM,
    },
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      domain: '',
      from: process.env.SENDGRID_FROM,
    },
  },
};
