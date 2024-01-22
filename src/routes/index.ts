import { Router } from 'express';
import authRoutes from './auth.routes';
import tasksRouter from './tasks.routes';
import contactRoutes from './contact.routes';


const router = Router()

router.use('/', contactRoutes);
router.use('/', authRoutes);
router.use('/', tasksRouter);

export default router