import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';

import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
}

export default container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers.redis
);
