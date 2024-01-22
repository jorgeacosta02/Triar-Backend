import { Request, Response } from "express";
import Task from "../models/task.model";

export const getTasksController = async (req: Request, res: Response) => {
    console.log('req.body.user.id en GTsC: ', req.body.user.id);
    const tasks = await Task.find({
        //Con esta propiedad busca las tareas que tienen ese userId
        userId: req.body.user.id
    })
    //con este agregado populate muestra la información del usuario relacinado a la tarea por el userId.
    .populate('userId');
    res.json(tasks);
};

export const getTaskController = async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id)
    .populate('userId');
    if (!task) return res.status(404).json({message: 'Tarea no encontrada'});
    res.json(task);
};

export const createTaskController = async (req: Request, res: Response) => {
    const {
        title,
        description,
        date,
        // Este es el objeto user agregado en validateToken.ts
        user
    } = req.body;
    const newTask = new Task({
        title,
        description,
        date,
        userId: user.id
    })
    const savedTask = await newTask.save();
    res.json(savedTask);
};

export const deleteTaskController = async (req: Request, res: Response) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({message: 'Tarea no encontrada'});
    res.json(task);
};

export const updateTaskController = async (req: Request, res: Response) => {
    // Se colocan dos parámetros, uno de búsqueda y uno con los datos para actualizar
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        // Devuelve el dato anterior a la actualización, con el parámetro new: true, devuelve el actualizado.
        {
            new: true
        }
    );
    if (!task) return res.status(404).json({message: 'Tarea no encontrada'});
    res.json(task);
};