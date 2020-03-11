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
            attributes: ['name', 'position', 'points'],
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

      const playerTeam_id = await team.getPlayers({ where: { id: player.id } })

      if (playerTeam_id[0] === undefined) {
         const result = await this.validaQtdePlayersNoTime(data)
         if (result) {
            await team.addPlayer(player)
            return true
         } else {
            return 'Remova um jodador primeiro'
         }
      } else {
         return 'Jogador já está no time'
      }

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
   },
   async validaQtdePlayersNoTime(data) {

      const team = await this.getTeam(data.id)

      const players = await team.getPlayers()

      if (players.length === 11) {
         return false
      }
      return true
   }
}

// aux functions

validarPlayer = async (player_id) => {

   return res = await PlayerRepository.validarPlayerID(player_id)
}



