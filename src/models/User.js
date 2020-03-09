const { Model, DataTypes } = require('sequelize')

class User extends Model {
   static init(connection) {
      super.init({
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         roles: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            defaultValue: 'user'
         },
         profile_url: DataTypes.STRING
      }, { sequelize: connection })
   }
}

module.exports = User
