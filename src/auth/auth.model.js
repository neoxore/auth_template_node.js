import { DataTypes } from "sequelize";
import sequelize from "../database/sequielize.js";

const AuthUser = sequelize.define('AuthUser' ,{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true
});

export default AuthUser;