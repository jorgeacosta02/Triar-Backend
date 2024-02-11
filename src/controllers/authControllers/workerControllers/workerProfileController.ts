import { Request, Response } from "express";
import { WorkerModel } from "../../../models/WorkerModel";
import { IWorkerDataFromDB } from "../../../Interfaces/workerInterfaces";


const workerProfileController = async (req: Request, res: Response) => {
    if (req.body.prof) {
        try {
            // Hacer casting a IUser para indicar que req.body.user tiene la propiedad 'id'
            const profFound = await WorkerModel.findByPk((req.body.prof as IWorkerDataFromDB).id);
            // Ahora TypeScript debería reconocer que userFound está definido y tiene una propiedad 'id'
            return res.json({
                id: profFound?.id,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(401).json({ message: 'Empleado no autenticado' });
    }
}

export default workerProfileController