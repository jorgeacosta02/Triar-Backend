import { Request, Response } from "express";
import { WorkerModel } from "../../../models/WorkerModel";
import bcrypt from 'bcrypt';
import { createWorkerToken } from "../../../libs/jwt";
import { ITokenWorkerData } from "../../../Interfaces/workerInterfaces";


const workerLogInController = async (req: Request, res: Response) => {
    console.log('res.cookie: ', res.cookie);
    // Destructuro los datos de la request
    const {dni, password} = req.body;
    // Veirifico que estén todos los datos necesarios
    if(!dni || !password){
        return res.status(400).json({msg: 'Por favor envíe su dni y contraseña.'});
    };

    try {
        // busco el trabajador en la db por email
        const worker = await WorkerModel.findOne({
            where: {
              dni // Ajusta esto según tus necesidades
            },
        });
        // envío mensaje de error si no se encuenta el empleado 
        if(!worker){
            return res.status(404).json({msg: 'El empleado no existe.'});
        };
        // comparo la contraseña recibida con la del empleado de la db
        const pwdMatch = await bcrypt.compare(password, worker.password);
        // mensaje de error si la contraseña no coincide
        if(!pwdMatch){
            return res.status(400).json({msg: 'El dni o la contraseña son incorrectos.'})
        };
        // Defino el objeto con los datos a enviar en el token.
        const tokenData: ITokenWorkerData = {
            id: worker.id,
            firstName: worker.firstName,
            lastName: worker.lastName,
            dni: worker.dni,
            phone: worker.phone,
            email: worker.email,
            healthPlan: worker.healthPlan,
            active: worker.active,
            role: worker.role
        }
        console.log('tokenData en workerLoginController', tokenData);
        // Creo un token para el empleado usando la función de libs/jwt
        const token = await createWorkerToken(tokenData);
        console.log('token en profloginController', token);
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);


        // Envío la respuesta de éxito al cliente
        console.log(worker);
        res.status(201).json({prof: tokenData})
    } catch (error: any) {
        // envío mensaje de error si ocurriera
        res.status(500).json({message: error.message});
    }
}

export default workerLogInController