import { Request, Response } from "express";
import { ProfModel } from "../../../models/ProfModel";
import bcrypt from 'bcrypt';
import { createToken } from "../../../libs/jwt";
import { ITokenProfData } from "../../../Interfaces/profInterfaces";


const profLogInController = async (req: Request, res: Response) => {
    console.log('res.cookie: ', res.cookie);
    // Destructuro los datos de la request
    const {dni, password} = req.body;
    // Veirifico que estén todos los datos necesarios
    if(!dni || !password){
        return res.status(400).json({msg: 'Por favor envíe su dni y contraseña.'});
    };

    try {
        // busco el ususario en la db por email
        const prof = await ProfModel.findOne({
            where: {
              dni // Ajusta esto según tus necesidades
            },
        });
        // envío mensaje de error si no se encuenta el usuario 
        if(!prof){
            return res.status(404).json({msg: 'El profesional no existe.'});
        };
        // comparo la contraseña recibida con la del usuario de la db
        const pwdMatch = await bcrypt.compare(password, prof.password);
        // mensaje de error si la contraseña no coincide
        if(!pwdMatch){
            return res.status(400).json({msg: 'El dni o la contraseña son incorrectos.'})
        };
        // Defino el objeto con los datos a enviar en el token.
        const tokenData: ITokenProfData = {
            id: prof.id,
            firstName: prof.firstName,
            lastName: prof.lastName,
            dni: prof.dni,
            phone: prof.phone,
            email: prof.email,
            healthPlan: prof.healthPlan,
            active: prof.active,
            role: prof.role
        }
        console.log('tokenData en profloginController', tokenData);
        // Creo un token para el usuario usando la función de libs/jwt
        const token = await createToken(tokenData);
        console.log('token en profloginController', token);
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);


        // Envío la respuesta de éxito al cliente
        console.log(prof);
        res.status(201).json({prof: tokenData})
    } catch (error: any) {
        // envío mensaje de error si ocurriera
        res.status(500).json({message: error.message});
    }
}

export default profLogInController