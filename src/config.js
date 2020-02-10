export const config = {
  providers: {
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      from: 'test@example.com',
    },
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      domain: '',
      from: 'test@example.com',
    },
  },
};
