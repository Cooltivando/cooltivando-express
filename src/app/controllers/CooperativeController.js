import * as Yup from 'yup';
import Cooperative from '../models/Cooperative';

class CooperativeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .required()
        .min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, oldPassword } = req.body;

    const cooperative = await Cooperative.findByPk(req.user.id);

    if (email !== cooperative.email) {
      const cooperativeExists = await Cooperative.findOne({
        where: { email },
      });

      if (cooperativeExists) {
        return res.status(400).json({ error: 'Cooperative already exists.' });
      }
    }

    if (oldPassword && !(await cooperative.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, phone } = await cooperative.update(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
    });
  }

  async index(req, res) {
    const cooperatives = await Cooperative.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(cooperatives);
  }
}

export default new CooperativeController();
