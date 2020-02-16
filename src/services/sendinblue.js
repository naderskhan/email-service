import { ApiClient, SMTPApi, SendSmtpEmail } from 'sib-api-v3-sdk';
import { providers } from 'config';
import { emailsToObject } from '../utils';

export const send = async (data) => {
  const { apiKey, from } = providers.sendinblue;
  const {
    to,
    cc,
    bcc,
    subject,
    text,
  } = data;

  const { instance: sendinblue } = ApiClient;
  const apiKeySetter = sendinblue.authentications['api-key'];
  apiKeySetter.apiKey = apiKey;

  const apiInstance = new SMTPApi();
  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.to = emailsToObject(to);
  sendSmtpEmail.sender = { email: from };
  sendSmtpEmail.text = text;
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.headers = { 'x-mailin-custom': 'myV3Custom' };
  sendSmtpEmail.cc = cc ? emailsToObject(cc) : [];
  sendSmtpEmail.bcc = bcc ? emailsToObject(bcc) : [];

  const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
  return result;
};
