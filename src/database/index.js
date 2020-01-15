import Sequelize from 'sequelize';

import Client from '../app/models/Client';
import Order from '../app/models/Order';
import Cooperative from '../app/models/Cooperative';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [Client, Order, Cooperative, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
