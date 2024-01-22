import { Router } from 'express';
import postContactController from '../controllers/postContact.controller';

const contactRoutes = Router();

contactRoutes.post('/contact', postContactController);

export default contactRoutes;