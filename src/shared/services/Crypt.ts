import bcrypt from 'bcrypt';
import config from '@config/crypt';

const hash = (value: any) => bcrypt.hash(value, config.hashSaltRounds);

const compare = (value: any, hashPass: string) =>
  bcrypt.compare(value, hashPass);

export { hash, compare };
