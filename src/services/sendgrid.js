import sendgrid from '@sendgrid/mail';
import { config } from '../config';

export const send = async (data) => {
  const { apiKey, from } = config.providers.sendgrid;
  const {
    to,
    cc,
    bcc,
    ...rest
  } = data;
  sendgrid.setApiKey(apiKey);

  // sendgrid expects emails as array
  const result = await sendgrid.send({
    from,
    to: to.split(','),
    ...(cc && { cc: cc.split(',') }),
    ...(bcc && { bcc: bcc.split(',') }),
    ...rest,
  });
  return result;
};
