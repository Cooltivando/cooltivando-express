import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        role: {
          type: Sequelize.VIRTUAL,
          defaultValue: 'client',
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async client => {
      if (client.password) {
        client.password_hash = await bcrypt.hash(client.password, 8);
      }
    });

    this.addHook('afterFind', async client => {
      if (client) {
        client.role = 'client';
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Client;
