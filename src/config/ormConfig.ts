import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
});

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  database: process.env.TYPEORM_DB,

  migrations: [String(process.env.TYPEORM_MIGRATIONS)],
  entities: [String(process.env.TYPEORM_ENTITIES)],

  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};

export = ormConfig;
