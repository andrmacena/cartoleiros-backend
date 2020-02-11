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
      this.belongsToMany(models.Player, { foreignKey: 'player_id', through: 'player_teams', as: 'players' })
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })

   }
}


module.exports = Team
