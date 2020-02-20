const Team = require('../models/Team')
const PlayerRepository = require('../repositories/PlayerRepository')

module.exports = {

   async createTeam(data) {
      const { name, logo_url, user_id, player_id } = data

      await Team.create({
         name,
         logo_url,
         user_id,
         player_id
      })
   },
   async getTeam(id) {
      
      const team = await Team.findOne({ where: { user_id: id } })

      return team
   },

   async addPlayerToTeam(player_id, data) {
      const res = await PlayerRepository.validarPlayerID(player_id)

      if (!res) {
         return false
      }

      const team = await this.getTeam(data.id)

      Team.create({
         name: team.name,
         logo_url: team.logo_url,
         user_id: team.user_id,
         player_id: player_id
      }, { where: { user_id: team.user_id } })

      return true
   }
}
