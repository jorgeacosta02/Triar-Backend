import { Request, Response } from "express";
import { ProfModel } from "../../../models/ProfModel";
import { IProfDataFromDB } from "../../../Interfaces/profInterfaces";


const profProfileController = async (req: Request, res: Response) => {
    if (req.body.prof) {
        try {
            // Hacer casting a IUser para indicar que req.body.user tiene la propiedad 'id'
            const profFound = await ProfModel.findByPk((req.body.prof as IProfDataFromDB).id);
            // Ahora TypeScript debería reconocer que userFound está definido y tiene una propiedad 'id'
            return res.json({
                id: profFound?.id,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(401).json({ message: 'Usuario no autenticado' });
    }
}

export default profProfileController