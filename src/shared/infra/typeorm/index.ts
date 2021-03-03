import { Connection, createConnection } from 'typeorm';
import connection from '@config/ormConfig';

export default async (name: string = 'default'): Promise<Connection> => {
  return createConnection(
    Object.assign(connection, {
      name,
    }),
  );
};
