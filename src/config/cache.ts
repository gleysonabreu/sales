import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;
  config: {
    redis: RedisOptions;
  };
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASS || undefined,
    },
  },
  driver: 'redis',
} as ICacheConfig;
