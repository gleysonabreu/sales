import express from 'express';
import cors from 'cors';
import AppHandleError from '@shared/errors/AppHandleError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(AppHandleError);

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
});
