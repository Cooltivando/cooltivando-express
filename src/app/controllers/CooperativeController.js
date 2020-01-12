import Cooperative from '../models/Cooperative';

class CooperativeController {
  async store(req, res) {
    const cooperativeExists = await Cooperative.findOne({
      where: { email: req.body.email },
    });

    if (cooperativeExists) {
      return res.status(400).json({ error: 'Cooperative already exists.' });
    }

    const { id, name, email } = await Cooperative.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    return res.json();
  }
}

export default new CooperativeController();
