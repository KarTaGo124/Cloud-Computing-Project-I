import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';
import User from '../../User/Domain/User';

class UserProfile extends Model {
  public id!: number;
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public phone_number!: string;
  public address!: string;
  public bio!: string;
  public date_of_birth!: Date;
  public country!: string;
}

UserProfile.init({
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
    allowNull: false,
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  address: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  date_of_birth: DataTypes.DATEONLY,
  country: DataTypes.STRING,
}, {
  sequelize,
  tableName: 'userprofiles',
  timestamps: false
});

User.hasOne(UserProfile, { foreignKey: 'user_id' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

export default UserProfile;
