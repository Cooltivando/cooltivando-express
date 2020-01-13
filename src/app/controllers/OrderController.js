import * as Yup from 'yup';

import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, message } = await Order.create(req.body);

    return res.json({
      id,
      message,
    });
  }

  async update(req, res) {
    return res.json();
  }
}

export default new OrderController();
