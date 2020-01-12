import Sequelize from 'sequelize';

import Client from '../app/models/Client';
import Order from '../app/models/Order';
import Cooperative from '../app/models/Cooperative';

import databaseConfig from '../config/database';

const models = [Client, Order, Cooperative];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
