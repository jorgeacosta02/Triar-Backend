import { Router } from 'express';
import {
    registerController,
    logInController,
    logOutController,
    profileController
} from '../controllers/auth.controller';
import { authRequired } from '../middlewares/validate.token'

const authRoutes = Router();

authRoutes.post('/register', registerController);
authRoutes.post('/login', logInController);
authRoutes.post('/logout', logOutController);
authRoutes.get('/profile', authRequired, profileController);

export default authRoutes