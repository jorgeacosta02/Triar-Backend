import { Router } from 'express';
import freeRoutes from './free.routes';
import authRoutes from './auth.routes';
import tasksRouter from './tasks.routes';
import contactRoutes from './contact.routes';


const router = Router()

router.use('/', freeRoutes)
router.use('/', contactRoutes);
router.use('/', authRoutes);
router.use('/', tasksRouter);

export default router