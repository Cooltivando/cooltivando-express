import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        message: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Order;
