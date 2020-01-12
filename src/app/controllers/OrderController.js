import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    const { id, message } = await Order.create(req.body);

    return res.json({
      id,
      message,
    });
  }

  async update(req, res){
    return res.json();
  }
}

export default new OrderController();
