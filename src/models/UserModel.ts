import {
  Model,
  Column,
  Table,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: any;

  @Column
  firstName!: string;
  @Column
  lastName!: string;
  @Column({
    type: DataType.INTEGER, // Ajusta el tipo según lo que uses para DNI
    allowNull: false,
  })
  dni!: string;
  @Column
  phone!: string;
  @Column
  email!: string;
  @Column
  password!: string;
  @Column
  position!: string;
  @Column
  active!: boolean;
  @Column
  role!: string;

  // Otros campos y decoradores según tu modelo
}


