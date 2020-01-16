import * as Yup from 'yup';

import Order from '../models/Order';
import File from '../models/File';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string(),
      file_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, message, file_id } = await Order.create(req.body);

    return res.json({
      id,
      message,
      file_id,
    });
  }

  async update(req, res) {
    return res.json();
  }

  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['id', 'message'],
      include: [
        {
          model: File,
          as: 'attached_order',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new OrderController();
