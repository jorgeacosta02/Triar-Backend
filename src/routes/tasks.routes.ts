import { Router } from "express";
import { userAuthRequired } from "../middlewares/userValidate.token";
import {
    getTasksController,
    createTaskController,
    getTaskController,
    deleteTaskController,
    updateTaskController
} from '../controllers/tasksContoller'

const tasksRouter = Router();

tasksRouter.get('/tasks', userAuthRequired, getTasksController);
tasksRouter.get('/tasks/:id', userAuthRequired, getTaskController);
tasksRouter.post('/tasks', userAuthRequired, createTaskController);
tasksRouter.delete('/tasks/:id', userAuthRequired, deleteTaskController);
tasksRouter.put('/tasks/:id', userAuthRequired, updateTaskController);

export default tasksRouter