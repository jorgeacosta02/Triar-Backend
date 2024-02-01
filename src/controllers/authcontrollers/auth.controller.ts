import { Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import { createToken } from "../../libs/jwt";
import { ITokenUserData, IUserData } from "../../Interfaces/userInterfaces";


export const registerController = async (req: Request, res: Response) => {
    
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

    // user check
    const user = await User.findOne({dni: dni});

    // user already exists
    if(user){
        return res.status(400).json({msg: 'El usuario ya existe.'})
    }


    // user does not exists
    try {
        // Genero un salt para hashear
        const salt = await bcrypt.genSalt(10);
        // Hasheo la contraseña
        const hash = await bcrypt.hash(password, salt);
        // Creo un nuevo usuario
        const newUser = new User ({
            firstName,
            lastName,
            dni,
            healthPlan,
            phone,
            email,
            password: hash
        });
        // Grabo el usuaro en la base de datos y lo coloco en una variable.
        const savedUser = await newUser.save();
        // Creo un token para el usuario usando la función de libs/jwt
        const token: string = await createToken({
            id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            active: savedUser.active,
            role: savedUser.role
        });
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);
        // Envío la respuesta de éxito al cliente
        res.status(201).json(
            `El usuario ${savedUser.firstName} ${savedUser.lastName} fue creado con éxito!!`
        );
    } catch (error: any) {
        // Envío respuesta de error al cliente
        res.status(500).json('registerController: ');
    }
}

export const logInController = async (req: Request, res: Response) => {
    console.log('res.cookie: ', res.cookie);
    // Destructuro los datos de la request
    const {dni, password} = req.body;
    // Veirifico que estén todos los datos necesarios
    if(!dni || !password){
        return res.status(400).json({msg: 'Por favor envíe su dni y contraseña.'});
    };

    try {
        // busco el ususario en la db por email
        const user = await User.findOne({ dni });
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
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            active: user.active,
            role: user.role
        }
        console.log('tokenData en loginController', tokenData);
        // Creo un token para el usuario usando la función de libs/jwt
        const token = await createToken(tokenData);
        console.log('token en loginController', token);
        // Coloco una cookie con el token en la respuesta
        res.cookie('token', token);


        // Envío la respuesta de éxito al cliente
        console.log(user);
        res.status(201).json({access: true, user: tokenData})
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
            const userFound = await User.findById((req.body.user as IUserData).id);
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