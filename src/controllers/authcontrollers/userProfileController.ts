import { Request, Response } from "express";
import { UserModel } from "../../models/UserModel";
import { IUserDataFromDB } from "../../Interfaces/userInterfaces";


const userProfileController = async (req: Request, res: Response) => {
    if (req.body.user) {
        try {
            // Hacer casting a IUser para indicar que req.body.user tiene la propiedad 'id'
            const userFound = await UserModel.findByPk((req.body.user as IUserDataFromDB).id);
            // Ahora TypeScript debería reconocer que userFound está definido y tiene una propiedad 'id'
            return res.json({
                id: userFound?.id,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(401).json({ message: 'Usuario no autenticado' });
    }
}

export default userProfileController