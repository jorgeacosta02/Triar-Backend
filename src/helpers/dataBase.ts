import { WorkerModel } from "../models/WorkerModel";
import { UserModel } from "../models/UserModel";

const dataBase = async () => {

    const users = [
        {
            firstName: 'Jorge',
            lastName: 'Acosta',
            dni: '23616110',
            phone: '2646730581',
            email: 'jorgeacostadeleon@yahoo.com',
            password: '123456',
            healtPlan: 'One',
            active: true,
            role: 'admin',
        },
    ]


    const insertedUsers:any = await UserModel.bulkCreate(users);
    
    const workers = [
        {
            firstName: 'Juan',
            lastName: 'Acosta',
            dni: '48858198',
            phone: '2646730581',
            email: 'juan@yahoo.com',
            password: '123456',
            healtPlan: 'One',
            active: true,
            role: 'worker',
        },
    ]


    const insertedWorkers:any = await WorkerModel.bulkCreate(workers);



    // Inventory
      
    // console.log("Registros de artículo insertados correctamente:", insertedArticles);
    // console.log("Registros de locaciones insertados correctamente:", insertedLocations);
    // console.log("Registros de movimientos insertados correctamente:", insertedInventoryMovements);

};

export default dataBase;
