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
      return await Team.findOne({ where: { user_id: id } })
   },

   async addPlayerToTeam(player_id, data) {
      const res = await PlayerRepository.validarPlayerID(player_id)

      if (!res) {
         return false
      }
      const player = await PlayerRepository.getById(player_id)

      const team = await this.getTeam(data.id)

      await team.addPlayer(player)

      return true
   }
}
