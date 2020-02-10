import Express from 'express';
import bodyParser from 'body-parser';
import { log, error } from 'console';
import { router } from './router';

const app = Express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

process.on('uncaughtException', (err) => error(`uncaughtException - ${err}`));
process.on('unhandledRejection', (reason) => error(`unhandledRejection - ${reason}`));

app.listen(PORT, () => log(`Running on port ${PORT} 🚀`));
