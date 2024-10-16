import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class UserModel extends Model {
  @Column
  firstname: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;
}
