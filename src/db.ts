import { Sequelize } from 'sequelize-typescript';
import { UserModel } from './models/UserModel';
import { TaskModel } from './models/AppointmentModel';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'triar',
  models: [UserModel, TaskModel],
});

export default sequelize;