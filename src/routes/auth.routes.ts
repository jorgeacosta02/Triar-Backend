import { Router } from 'express';
import userRegisterController from '../controllers/authControllers/userControllers/userRegisterController';
import userLogInController from '../controllers/authControllers/userControllers/userLoginController';
import userLogOutController from '../controllers/authControllers/userControllers/userLogoutController';
import userProfileController from '../controllers/authControllers/userControllers/userProfileController';
import workerRegisterController from '../controllers/authControllers/workerControllers/workerRegisterController';
import workerProfileController from '../controllers/authControllers/workerControllers/workerProfileController';
import workerLogInController from '../controllers/authControllers/workerControllers/workerLoginController';

import { userAuthRequired } from '../middlewares/userValidate.token'
import { workerAuthRequired } from '../middlewares/workerValidate.token';

const authRoutes = Router();

// UserRoutes
authRoutes.post('/user-register', userRegisterController);
authRoutes.post('/user-login', userLogInController);
authRoutes.post('/user-logout', userLogOutController);
authRoutes.get('/user-profile', userAuthRequired, userProfileController);

// WorkerRoutes
authRoutes.post('/worker-register', workerRegisterController)
authRoutes.post('/worker-login', workerLogInController)
authRoutes.get('/worker-profile', workerAuthRequired, workerProfileController)

export default authRoutes