import { sequelize } from "../utils/database";
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'
import { Env } from '../config'


const UserModel = sequelize.define('User', {
    // Model attributes are defined here
    id: {

        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false

    },
    fullName: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    userType: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    guid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    isSubscriber: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    affiliateCode:{
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10, 'a');
                user.password =await bcrypt.hash(user.password, salt);
            }
        }
    }
});

(async () => {
    try {
      await UserModel.sync({alter:true})
      await UserModel.findOrCreate({
        where: { email: Env.adminEmail},
        defaults: { fullName: Env.adminUser, email: Env.adminEmail, password: Env.adminPassword, affiliateCode: 'xyz', userType: 'admin'}
      });
    } catch (error) {
      console.error('Error syncing models:', error);
    }
  })();

export default UserModel