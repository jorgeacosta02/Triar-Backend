import { Request, Response } from "express";
import { WorkerModel } from "../../../models/WorkerModel";
import bcrypt from 'bcrypt';
import { createWorkerToken } from "../../../libs/jwt";


const workerRegisterController = async (req: Request, res: Response) => {
    
    const {
        firstName,
        lastName,
        dni,
        healthPlan,
        phone,
        email,
        password
    } = req.body;

    // validations    
    if(!firstName ) return res.status(400).json({msg: 'Por favor envíe su nombre.'});
    if(!lastName ) return res.status(400).json({msg: 'Por favor envíe su apellido.'});
    console.log(dni)
    if(!dni ) return res.status(400).json({msg: 'Por favor envíe su dni.'});
    if(!email ) return res.status(400).json({msg: 'Por favor envíe su nombre correo.'});
    if(!password ) return res.status(400).json({msg: 'Por favor envíe su contraseña.'});

    // worker check
    const user = await WorkerModel.findOne({
        where:{
            dni
        }
    });

    // worker already exists
    if(user){
        return res.status(400).json({msg: 'El trabajador ya existe.'})
    }

    // worker does not exists
    try {
        // Genero un salt para hashear
        const salt = await bcrypt.genSalt(10);
        // Hasheo la contraseña
        const hash = await bcrypt.hash(password, salt);
        // Creo un nuevo usuario
        const newWorker = new WorkerModel ({
            firstName,
            lastName,
            dni,
            healthPlan,
            phone,
            email,
            password: hash
        });
        // Grabo el usuaro en la base de datos y lo coloco en una variable.
        const savedWorker = await newWorker.save();
        // Creo un token para el usuario usando la función de libs/jwt
        const token: string = await createWorkerToken({
            id: savedWorker.id,
            firstName: savedWorker.firstName,
            lastName: savedWorker.lastName,
            dni: savedWorker.dni,
            phone: savedWorker.phone,
            email: savedWorker.email,
            healthPlan: savedWorker.healthPlan,
            active: savedWorker.active,
            role: savedWorker.role
        });
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);
        // Envío la respuesta de éxito al cliente
        res.status(201).json(
            `El profesional ${savedWorker.firstName} ${savedWorker.lastName} fue creado con éxito!!`
        );
    } catch (error: any) {
        // Envío respuesta de error al cliente
        res.status(500).json({'error': error.message});
    }
}

export default workerRegisterController