import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    
    // console.log('token en middleware:', token);

    if(!token) return res.status(401).json({message: "No hay token de autorización"});
    jwt.verify(token, config.jwtSecret, (err: any, user: any) => {
        if(err) {
            // console.log('error en valid')
            return res.status(406).json({ message: err.message});
        }
        // console.log('user in valid: ', user);
        req.body.user = user
        next();
    });
};