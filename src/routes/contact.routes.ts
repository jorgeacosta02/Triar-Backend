import { Router } from 'express';
import postContactController from '../controllers/postContactController';

const contactRoutes = Router();

contactRoutes.post('/contact', postContactController);

export default contactRoutes;