import { Request, Response } from "express";
import { UserModel } from "../../../models/UserModel";
import bcrypt from 'bcrypt';
import { createUserToken } from "../../../libs/jwt";
import { ITokenUserData } from "../../../Interfaces/userInterfaces";


const userLogInController = async (req: Request, res: Response) => {
    console.log('res.cookie: ', res.cookie);
    // Destructuro los datos de la request
    const {dni, password} = req.body;
    // Veirifico que estén todos los datos necesarios
    if(!dni || !password){
        return res.status(400).json({msg: 'Por favor envíe su dni y contraseña.'});
    };

    try {
        // busco el ususario en la db por dni
        const user = await UserModel.findOne({
            where: {
              dni
            },
        });
        // envío mensaje de error si no se encuenta el usuario 
        if(!user){
            return res.status(404).json({msg: 'El usuario no existe.'});
        };
        // comparo la contraseña recibida con la del usuario de la db
        const pwdMatch = await bcrypt.compare(password, user.password);
        // mensaje de error si la contraseña no coincide
        if(!pwdMatch){
            return res.status(400).json({msg: 'El dni o la contraseña son incorrectos.'})
        };
        // Defino el objeto con los datos a enviar en el token.
        const tokenData: ITokenUserData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            dni: user.dni,
            phone: user.phone,
            email: user.email,
            healthPlan: user.healthPlan,
            active: user.active,
            role: user.role
        }
        console.log('tokenData en loginController', tokenData);
        // Creo un token para el usuario usando la función de libs/jwt
        const token = await createUserToken(tokenData);
        console.log('token en loginController', token);
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);


        // Envío la respuesta de éxito al cliente
        console.log(user);
        res.status(201).json({user: tokenData})
    } catch (error: any) {
        // envío mensaje de error si ocurriera
        res.status(500).json({message: error.message});
    }
}

export default userLogInController