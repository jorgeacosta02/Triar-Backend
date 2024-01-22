import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import { createToken } from "../libs/jwt";


export const signUpController = async (req: Request, res: Response) => {
    
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg: 'Por favor envíe su correo y contraseña.'});
    }
    
    const user = await User.findOne({email: email});
    if(user){
        return res.status(400).json({msg: 'El usuario ya existe.'})
    }

    try {
        // Genero un salt para hashear
        const salt = await bcrypt.genSalt(10);
        // Hasheo la contraseña
        const hash = await bcrypt.hash(password, salt);
        // Creo un nuevo usuario
        const newUser = new User ({
            email,
            password: hash
        });
        // Grabo el usuaro en la base de datos y lo coloco en una variable.
        const savedUser = await newUser.save();
        // Creo un token para el usuario usando la función de libs/jwt
        const token = await createToken(savedUser);
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);
        // Envío la respuesta de éxito al cliente
        res.status(201).json(`El usuario ${savedUser.email} fue creado con éxito!!`);
    } catch (error: any) {
        // Envío respuesta de error al cliente
        res.status(500).json({message: error.message});
    }
}

export const logInController = async (req: Request, res: Response) => {
    // Destructuro los datos de la request
    const {email, password} = req.body;
    // Veirifico que estén todos los datos necesarios
    if(!email || !password){
        return res.status(400).json({msg: 'Por favor envíe su correo y contraseña.'});
    };

    try {
        // busco el ususario en la db por email
        const user = await User.findOne({ email });
        // envío mensaje de error si no se encuenta el usuario 
        if(!user){
            return res.status(404).json({msg: 'El usuario no existe.'});
        };
        // comparo la contraseña recibida con la del usuario de la db
        const pwdMatch = await bcrypt.compare(password, user.password);
        // mensaje de error si la contraseña no coincide
        if(!pwdMatch){
            return res.status(400).json({msg: 'El correo o la contraseña son incorrectos.'})
        };
        // Creo un token para el usuario usando la función de libs/jwt
        const token = await createToken(user);
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);
        // Envío la respuesta de éxito al cliente
        res.status(201).json({user})
    } catch (error: any) {
        // envío mensaje de error si ocurriera
        res.status(500).json({message: error.message});
    }
}

export const logOutController = (req: Request, res: Response ) => {
    // establezco cookie con token vacío
    res.cookie('token','',
        {
            expires: new Date(0),
        }
    );
    // envío mensaje de éxito.
    res.sendStatus(200);
}

export const profileController = async (req: Request, res: Response) => {
    if (req.body.user) {
        try {
            // Hacer casting a IUser para indicar que req.body.user tiene la propiedad 'id'
            const userFound = await User.findById((req.body.user as IUser).id);
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