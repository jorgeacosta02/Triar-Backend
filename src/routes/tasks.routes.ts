import { Router } from "express";
import { authRequired } from "../middlewares/validate.token";
import {
    getTasksController,
    createTaskController,
    getTaskController,
    deleteTaskController,
    updateTaskController
} from '../controllers/tasksContoller'

const tasksRouter = Router();

tasksRouter.get('/tasks', authRequired, getTasksController);
tasksRouter.get('/tasks/:id', authRequired, getTaskController);
tasksRouter.post('/tasks', authRequired, createTaskController);
tasksRouter.delete('/tasks/:id', authRequired, deleteTaskController);
tasksRouter.put('/tasks/:id', authRequired, updateTaskController);

export default tasksRouter