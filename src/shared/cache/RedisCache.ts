import Redis, { Redis as RedisClient } from 'ioredis';
import redisConfig from '@config/cache';

class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(redisConfig.config.redis);
  }

  async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    const parseJSON = JSON.parse(data) as T;
    return parseJSON;
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default RedisCache;
