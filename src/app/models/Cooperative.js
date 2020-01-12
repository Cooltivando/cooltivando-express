import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Cooperative extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        role: {
          type: Sequelize.VIRTUAL,
          defaultValue: 'cooperative',
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async cooperative => {
      if (cooperative.password) {
        cooperative.password_hash = await bcrypt.hash(cooperative.password, 8);
      }
    });

    this.addHook('afterFind', async cooperative => {
      if (cooperative) {
        cooperative.role = 'cooperative';
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Cooperative;
