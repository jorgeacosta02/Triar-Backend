import {
    Model,
    Column,
    Table,
    PrimaryKey,
    Default,
    DataType,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'worker' })
  export class WorkerModel extends Model {
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
      type: DataType.STRING, // Ajusta el tipo según lo que uses para DNI
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
    healthPlan!: string;
    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Valor por defecto para la columna 'active'
    })
    active!: boolean;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      defaultValue: 'prof', // Valor por defecto para la columna 'role'
    })
    role!: string;
  }
  
  
  