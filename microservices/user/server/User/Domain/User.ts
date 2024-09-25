import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public created_at!: Date;
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: false
});

export default User;
