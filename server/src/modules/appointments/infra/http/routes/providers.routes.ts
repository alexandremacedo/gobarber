import { Router } from 'express';
import 'express-async-errors';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProviderController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
