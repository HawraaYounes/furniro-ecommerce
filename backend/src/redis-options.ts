import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store'; // Ensure you install this

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true, // This makes the cache globally available
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: 'localhost', // Replace with your Redis host if needed
        port: 6379,        // Replace with your Redis port if needed
      },
    });
    return {
      store: store,  // Use store directly, no need to wrap in a function
      ttl: 600,      // Time-to-live for cached items (optional)
    };
  },
};
