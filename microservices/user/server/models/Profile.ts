import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import User from './User';

const UserProfile = sequelize.define('UserProfile', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: 'id',
    },
  },
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  phone_number: DataTypes.TEXT,
  address: DataTypes.TEXT,
});

User.hasOne(UserProfile, { foreignKey: 'user_id' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

export default UserProfile;
