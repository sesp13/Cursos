import { DataTypes } from 'sequelize';
import { db } from '../db/conn';

const User = db.define('User', {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN
  },
});

export default User;
