import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import archievesUploadConfig from '@config/archievesUpload';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(archievesUploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.create,
);

export default usersRouter;
