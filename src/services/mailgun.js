import mailgun from 'mailgun-js';
import { config } from '../config';

export const send = async (data) => {
  const { apiKey, domain, from } = config.providers.mailgun;
  const mg = mailgun({ apiKey, domain });
  const result = await mg.messages().send({
    from,
    ...data,
  });
  return result;
};
