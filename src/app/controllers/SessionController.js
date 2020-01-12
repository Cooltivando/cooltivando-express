import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Client from '../models/Client';
import Cooperative from '../models/Cooperative';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const client = await Client.findOne({ where: { email } });
    const cooperative = await Cooperative.findOne({ where: { email } });

    if (!client && !cooperative) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = client || cooperative;

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, role } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        role,
      },
      token: jwt.sign({ id, role }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
