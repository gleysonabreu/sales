import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import AppHandleError from '@shared/errors/AppHandleError';
import uploadConfig from '@config/upload';
import routes from './routes';
import connection from '../typeorm';
import '../../container';

connection();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(AppHandleError);

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
});
