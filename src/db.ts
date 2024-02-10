import { Sequelize } from 'sequelize-typescript';
import { UserModel } from './models/UserModel';
import { ProfModel } from './models/ProfModel';
import { AppointmentModel } from './models/AppointmentModel';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'triar',
  models: [UserModel, ProfModel, AppointmentModel],
});

export default sequelize;