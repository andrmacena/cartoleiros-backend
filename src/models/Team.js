const { Model, DataTypes } = require('sequelize')

class Team extends Model {
   static init(connection) {
      super.init({
         name: DataTypes.STRING,
         logo_url: DataTypes.STRING
      }, { sequelize: connection })

   }
   //criando relacionamento entre os modelos
   static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
      this.belongsTo(models.Player, { foreignKey: 'player_id', as: 'players' })

   }
}


module.exports = Team
