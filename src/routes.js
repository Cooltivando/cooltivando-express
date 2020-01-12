import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import CooperativeController from './app/controllers/CooperativeController';
import OrderController from './app/controllers/OrderController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/clients', ClientController.store);
routes.put('/clients', ClientController.update);

routes.post('/cooperatives', CooperativeController.store);
routes.put('/cooperatives', CooperativeController.update);

routes.post('/orders', OrderController.store);
routes.put('/orders', OrderController.update);

export default routes;
