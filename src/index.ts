import sequelize from "./db";
import app from "./app";
import dataBase from "./helpers/dataBase";
import dotenv from "dotenv";
import { SyncOptions } from 'sequelize';
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

dotenv.config();
const port = process.env.PORT || 4000;

// Definir un modelo para la sincronización de Sequelize
interface ISyncOptions extends SyncOptions {
  // force?: false;
}

// Sincronizar la base de datos y levantar el servidor
async function main() {
  try {
    // Verificar la conexión a la base de datos
    await sequelize.authenticate();
    console.log("Conexión a la Base de Datos exitosa");

    // Sincronizar la base de datos
    const syncOptions: ISyncOptions = { force: true };
    await sequelize.sync(syncOptions)
    .then(()=>{
      dataBase(),
      app.listen(port, () => {
        console.log(`Server listening now on port ${port}`);
      });
    })
    console.log("La base de datos se ha sincronizado correctamente");

  } catch (error) {
    console.error("Error al conectarse a la Base de Datos:", error);
    process.exit(1); // Salir de la aplicación en caso de error
  }
}

main();

// Manejador de errores global para Express
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  console.error("Error en la aplicación:", err);
  res.status(500).send("Internal Server Error");
});

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });