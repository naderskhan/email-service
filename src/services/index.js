import { providers } from 'config';
import { constants } from '../constants';
import { validateData } from '../utils';

const { log, error } = console;

export const sendEmail = async (req, res) => {
  const { EMAIL_SUCCESSFUL, EMAIL_FAILED, INVALID_DATA } = constants;

  const data = validateData(req.body);
  if (!data) {
    return res.status(400).send({ message: INVALID_DATA });
  }

  let isSent = false;
  for (const provider of Object.keys(providers)) {
    const { send } = require(`./${provider}`);
    try {
      isSent = await send(data);
      log(`Successfully sent with ${provider}`);
      break;
    } catch (err) {
      error(`Failed to send with ${provider} - ${err}`);
    }
  }
  return isSent && typeof isSent !== 'undefined'
    ? res.status(200).send({ message: EMAIL_SUCCESSFUL })
    : res.status(500).send({ message: EMAIL_FAILED });
};
