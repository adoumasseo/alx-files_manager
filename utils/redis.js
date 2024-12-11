const { createClient } = require('redis');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.error('Redis client failed to connect:', err.message || err.toString()));
  }

  async isAlive() {
    try {
      if (this.client.isOpen) {
        await this.client.connect();
      }
      const response = await this.client.ping();
      return response === 'PONG';
    } catch (error) {
      return false;
    }
  }

  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  async set(key, value, duration) {
    await this.client.set(key, value, { EX: duration });
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = RedisClient();
module.exports = redisClient;
