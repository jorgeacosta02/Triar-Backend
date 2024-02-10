import { Document } from "mongoose";


// Interface for saving prof on db
export interface IProfData extends Document {
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

// Interface prof from db
export interface IProfDataFromDB {
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

// Interface for register prof
export interface IProfRegisterData {
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
    user: IProfData;
    message: string;
}

// tokenInterface 'prof'
export interface ITokenProfData {
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
  