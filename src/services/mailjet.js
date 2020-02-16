import { providers } from 'config';
import { emailsToObject } from '../utils';

const { apiKey, from } = providers.mailjet;
const mailjet = require('node-mailjet').connect(apiKey[0], apiKey[1]);


export const send = async (data) => {
  const {
    to,
    cc,
    bcc,
    subject,
    text,
  } = data;
  const result = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: from,
        },
        To: emailsToObject(to, 'Email'),
        Cc: cc ? emailsToObject(cc, 'Email') : [],
        Bcc: bcc ? emailsToObject(bcc, 'Email') : [],
        Subject: subject,
        TextPart: text,
        CustomID: 'MailJet',
      },
    ],
  });
  return result;
};
