import { sendEmail } from './services';

export const router = (app) => {
  app.post('/email', sendEmail);

  // healthcheck / root & everything else
  app.get('/health', (_, res) => res.status(200).send({ message: 'UP' }));
  app.get('/', (_, res) => res.status(200).send({ message: 'Email Service' }));
  app.get('*', (_, res) => res.status(404).send({ message: 'Not found' }));
};
