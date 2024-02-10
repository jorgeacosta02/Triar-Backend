import { Router } from 'express';
import userRegisterController from '../controllers/authControllers/userControllers/userRegisterController';
import userLogInController from '../controllers/authControllers/userControllers/userLoginController';
import userLogOutController from '../controllers/authControllers/userControllers/userLogoutController';
import userProfileController from '../controllers/authControllers/userControllers/userProfileController';
import { authRequired } from '../middlewares/validate.token'

const authRoutes = Router();

authRoutes.post('/register', userRegisterController);
authRoutes.post('/login', userLogInController);
authRoutes.post('/logout', userLogOutController);
authRoutes.get('/profile', authRequired, userProfileController);

export default authRoutes