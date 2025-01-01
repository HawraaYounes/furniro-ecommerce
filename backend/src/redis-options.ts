import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: '127.0.0.1',
        port: 6379,
      },
    });
    return {
      store: () => store,
      ttl: 600, // time-to-live in seconds, adjust as needed
    };
  },
 
};
