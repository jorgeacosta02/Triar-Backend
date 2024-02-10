import {
    Model,
    Column,
    Table,
    PrimaryKey,
    Default,
    DataType,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'appointment' })
  export class AppointmentModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
    })
    id!: any;
  
    @Column
    name!: string;
    @Column
    description!: string;
  }
  

  