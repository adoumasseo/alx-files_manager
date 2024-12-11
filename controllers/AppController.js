import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(request, response) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      response.status(200).json('{ "redis": true, "db": true }');
    }
  }

  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}

export default AppController;
