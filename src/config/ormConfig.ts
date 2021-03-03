import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'sales',

  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],

  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};

export = ormConfig;
