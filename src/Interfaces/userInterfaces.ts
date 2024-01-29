
// Interface for save user in db
export interface IUserData {
    firstName: string;
    lastName: string;
    dni: number;
    healthPlan?: string;
    phone: number;
    email: string;
    password: string;
    status: boolean;
    role: string;
}

// Interface user from db
export interface IUserDataFromDB {
    _id: string,
    firstName: string;
    lastName: string;
    dni: number;
    healthPlan?: string;
    phone: number;
    email: string;
    password: string;
    status: boolean;
    role: string;
}

// Interface for register user
export interface IRegisterData {
    firstName: string;
    lastName: string;
    dni: number;
    healthPlan?: string;
    phone: number;
    email: string;
    password: string;
}

// LOGIN
export interface ILoginData {
    dni: number;
    password: string;
  }

// ApiResponse
export interface ApiResponse {
    user: IUserData;
    message: string;
}

// tokenInterface 'user'
export interface ITokenUserData {
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    status: boolean
}
  