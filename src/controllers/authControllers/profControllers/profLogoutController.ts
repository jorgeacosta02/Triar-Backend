import { Request, Response } from "express";


const profLogOutController = (req: Request, res: Response ) => {
    // establezco cookie con token vacío
    res.cookie('token','',
        {
            expires: new Date(0),
        }
    );
    // envío mensaje de éxito.
    res.sendStatus(200);
}

export default profLogOutController