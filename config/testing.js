module.exports = {
  providers: {
    mailgun: {
      apiKey: 'dummyKey',
      domain: 'dummyDomain',
      from: 'dummy@dummy.com',
    },
    sendgrid: {
      apiKey: 'dummyKey',
      domain: '',
      from: 'dummy@dummy.com',
    },
  },
};
