import { Model, DataTypes } from "sequelize";
import { db } from "../../util/database";

interface UserInstance extends Model {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const User = db.define<UserInstance>("users", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
