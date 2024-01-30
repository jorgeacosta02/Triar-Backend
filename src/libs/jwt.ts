import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import config from "../config/config";
import { ITokenUserData } from "../Interfaces/userInterfaces";


// Crea un token para crear usuario
export const createToken = (user: ITokenUserData): Promise<string> => {
    
    //devuelve una promesa resuelta o rechazada
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                id: user.id,
            },
            config.jwtSecret,
            {
                expiresIn: 86400
            },
            (err, token) => {
                //la estructura del if debe ser esta para typescript
                if (err) {
                    reject(err);
                } else if (token) {
                    resolve(token);
                } else {
                    reject(new Error("Token no generado"));
                }
            }
        );
    })
}