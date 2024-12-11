import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(request, response) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      response.status(200).json('{ "redis": true, "db": true }');
    }
  }

  static async getStats(request, response) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    const stats = `{ "users": ${nbUsers}, "files": ${nbFiles} }`;
    response.status(200).json(stats);
  }
}

export default AppController;
