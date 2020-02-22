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
   },

   async removePlayerOfTeam(player_id, data) {
      const res = await PlayerRepository.validarPlayerID(player_id)

      if (!res) {
         return false
      }

      const team = await this.getTeam(data.id)

      const playerTeam_id = findTeamPlayer(player_id)

      //após dar a função destroy no time, todo o resto é excluido (CASCADE) discorey to fix this problem
      team.destroy({
         where: {
            playerTeam_id
         }
      })
      return true
   }
}

findTeamPlayer = async (id) => {
   return await Team.findByPk({ where: { id } }, {
      include: {
         association: 'players',
         through: { attributes: ['team_id'] }

      }
   })

}

