import mailgun from 'mailgun-js';
import { providers } from 'config';

export const send = async (data) => {
  const { apiKey, domain, from } = providers.mailgun;
  const mg = mailgun({ apiKey, domain });
  const result = await mg.messages().send({
    from,
    ...data,
  });
  return result;
};
