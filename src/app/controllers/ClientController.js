import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    const clientExists = await Client.findOne({
      where: { email: req.body.email },
    });

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists.' });
    }

    const { id, name, email, phone } = await Client.create(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const client = await Client.findByPk(req.user.id);

    if (email !== client.email) {
      const clientExists = await Client.findOne({
        where: { email: req.body.email },
      });

      if (clientExists) {
        return res.status(400).json({ error: 'Client already exists.' });
      }
    }

    if (!(await client.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    return res.json();
  }
}

export default new ClientController();
