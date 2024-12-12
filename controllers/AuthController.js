import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async getConnect(req, res) {
    let authTokens = Buffer.from(req.headers.authorization.split(' ')[1], 'base64');
    authTokens = authTokens.toString();
    const emailtoken = authTokens.split(':')[0];
    const passwdtoken = sha1(authTokens.split(':')[1]);
    const user = await (await dbClient.usersCollection()).findOne(
      { email: emailtoken, password: passwdtoken },
    );
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
    }
    const idToken = uuidv4();
    await redisClient.set(`auth_${idToken}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).send(`{ "token": ${idToken}}`);
  }

  static async getDisconnect(req, res) {
    const authToken = req.headers['X-Token'];
    const key = `auth_${authToken}`;
    const result = await redisClient.get(key);
    if (!result) {
      res.status(401).json({ error: 'Unauthorized' });
    }
    await redisClient.del(key);
    return res.status(204);
  }
}

export default UsersController;
