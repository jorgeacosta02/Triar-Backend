import { Router } from 'express';
import userRegisterController from '../controllers/authControllers/userControllers/userRegisterController';
import userLogInController from '../controllers/authControllers/userControllers/userLoginController';
import userLogOutController from '../controllers/authControllers/userControllers/userLogoutController';
import userProfileController from '../controllers/authControllers/userControllers/userProfileController';
import profRegisterController from '../controllers/authControllers/profControllers/profRegisterController';
import profProfileController from '../controllers/authControllers/profControllers/profProfileController';

import { userAuthRequired } from '../middlewares/userValidate.token'
import { profAuthRequired } from '../middlewares/profValidate.token';

const authRoutes = Router();

// UserRoutes
authRoutes.post('/user-register', userRegisterController);
authRoutes.post('/user-login', userLogInController);
authRoutes.post('/user-logout', userLogOutController);
authRoutes.get('/user-profile', userAuthRequired, userProfileController);

// ProfRoutes
authRoutes.post('/prof-register', profRegisterController)
authRoutes.get('/prof-profile', profAuthRequired, profProfileController)

export default authRoutes