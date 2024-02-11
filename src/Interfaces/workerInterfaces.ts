import { Document } from "mongoose";


// Interface for saving worker on db
export interface IWorkerData extends Document {
    id: string,
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    email: string;
    password: string;
    healthPlan: string;
    active: boolean;
    role: string;
}

// Interface worker from db
export interface IWorkerDataFromDB {
    id: string,
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    email: string;
    password: string;
    healthPlan: string;
    active: boolean;
    role: string;
}

// Interface for register worker
export interface IWorkerRegisterData {
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    email: string;
    password: string;
}

// LOGIN
export interface ILoginData {
    dni: string;
    password: string;
  }

// ApiResponse
export interface ApiResponse {
    user: IWorkerData;
    message: string;
}

// tokenInterface 'worker'
export interface ITokenWorkerData {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    email: string;
    healthPlan: string;
    active: boolean;
    role: string;
}
  