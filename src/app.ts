import express from "express";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";
import router from "./routes";
import dotenv from 'dotenv';
import './db';

dotenv.config();
const port = process.env.PORT || 4000;

// Initialization
const app = express();

// Settings
app.set('port', port)

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', router)

export default app

