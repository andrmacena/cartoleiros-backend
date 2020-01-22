const { Model, DataTypes } = require('sequelize')

class Player extends Model {
   static init(connection) {
      super.init({
         name: DataTypes.STRING,
         age: DataTypes.STRING,
         position: {
            type: DataTypes.ENUM,
            values: ['goleiro', 'zagueiro','lateral-direito','lateral-esquerdo','meia-direita','meia-esquerda','volante','atacante'],
            defaultValue: 'zagueiro'
         },
         points: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
         }
      }, { sequelize: connection })
   }
}

module.exports = Player