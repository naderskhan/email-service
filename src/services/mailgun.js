import { providers } from 'config';
import { toBase64, post } from '../utils';

export const send = async (data) => {
  const { domain, apiKey, from } = providers.mailgun;
  const result = await post(
    domain,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${toBase64(apiKey)}`,
    },
    {
      from,
      ...data,
    },
  );
  return result;
};
