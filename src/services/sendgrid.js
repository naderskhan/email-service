import { providers } from 'config';
import { post, emailsToObject } from '../utils';

export const send = async (data) => {
  const { domain, apiKey, from } = providers.sendgrid;
  const {
    to,
    subject,
    text,
    cc,
    bcc,
  } = data;

  const result = await post(
    domain,
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    {
      personalizations: [{
        to: emailsToObject(to),
        ...(cc && { cc: emailsToObject(cc) }),
        ...(bcc && { bcc: emailsToObject(bcc) }),
        subject,
      }],
      from: {
        email: from,
      },
      content: [{
        type: 'text/plain',
        value: text,
      }],
    },
  );
  return result;
};
