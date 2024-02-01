import { Router } from 'express';
import userRegisterController from '../controllers/authcontrollers/userRegisterController';
import userLogInController from '../controllers/authcontrollers/userLoginController';
import userLogOutController from '../controllers/authcontrollers/userLogoutController';
import userProfileController from '../controllers/authcontrollers/userProfileController';
 
import { authRequired } from '../middlewares/validate.token'

const authRoutes = Router();

authRoutes.post('/register', userRegisterController);
authRoutes.post('/login', userLogInController);
authRoutes.post('/logout', userLogOutController);
authRoutes.get('/profile', authRequired, userProfileController);

export default authRoutes