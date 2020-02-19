const Team = require('../models/Team')
const PlayerRepository = require('../repositories/PlayerRepository')

module.exports = {

   async createTeam(data) {
      const { name, logo_url, user_id } = data

      await Team.create({
         name,
         logo_url,
         user_id
      })
   },
   async getTeam(id) {

      const team = await Team.findAll({ where: { user_id: id } })

      return team
   },

   async addPlayerToTeam(player_id){
      const { id } = player_id

      const player = await PlayerRepository.getById(id)

      return await Team.addPlayer(player)
   }
}
