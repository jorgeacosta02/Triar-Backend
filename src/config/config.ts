import dotenv from 'dotenv';

dotenv.config()

export interface TriarDBType {
    URI: string | undefined;
    USER: string | undefined;
    PASSWORD: string | undefined;
}

export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    TriarDB: {
        URI: process.env.MONGODB_URI,
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    },
}