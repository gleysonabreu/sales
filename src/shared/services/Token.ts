import jwt, { SignOptions } from 'jsonwebtoken';
import config from '@config/crypt';

const signOptions: SignOptions = {
  expiresIn: config.jwt.duration,
};

const sign = (payload: object | string | Buffer) =>
  jwt.sign(payload, config.jwt.secret, signOptions);

const verify = (token: string) => jwt.verify(token, config.jwt.secret);

export { sign, verify };
