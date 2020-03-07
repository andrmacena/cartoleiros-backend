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
      return await Team.findOne({
         attributes: ['name', 'logo_url'],
         where: { user_id: id }
      })
   },
   async getTeamAndPlayers(id) {

      return await Team.findOne({
         attributes: ['name', 'logo_url'],
         where:
         {
            user_id: id,

         },
         include: [{
            association: 'players',
            attributes: ['name', 'position'],
            through: { attributes: ['player_id'] }
         }]
      })

   },
   async addPlayerToTeam(player_id, data) {
      const res = await validarPlayer(player_id)

      if (!res) {
         return false
      }
      const player = await PlayerRepository.getById(player_id)

      const team = await this.getTeam(data.id)

      await team.addPlayer(player)

      return true
   },

   async removePlayerOfTeam(player_id, data) {
      const res = await validarPlayer(player_id)

      if (!res) {
         return false
      }

      const team = await this.getTeam(data.id)

      const playerTeam_id = await team.getPlayers({ where: { id: player_id } })

      team.removePlayer(playerTeam_id[0].dataValues.id)

      return true
   }
}

// aux functions

validarPlayer = async (player_id) => {

   return res = await PlayerRepository.validarPlayerID(player_id)
}

