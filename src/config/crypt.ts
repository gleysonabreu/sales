export default {
  hashSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  jwt: {
    secret: String(process.env.JWT_SECRET),
    duration: process.env.JWT_DURATION || '1h',
  },
};
