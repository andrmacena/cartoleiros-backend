const Player = require('../models/Player')

module.exports = {

   async get() {

      return await Player.findAll({ attributes: ['id', 'name', 'position', 'points'] })
   },

   async getById(id) {

      return await Player.findByPk(id)

   },

   async createPlayer(data) {

      const { name, age, position, player_url } = data
      await Player.create({
         name,
         age,
         position,
         points: 0,
         player_url
      })
   },
   async updatePlayer(id, data) {

      const res = await validarPlayerID(id)
      if (res) {
         await Player.update({
            name: data.name,
            age: data.age,
            position: data.position,
            player_url: data.player_url

         }, {
            where: { id }
         })
         return true
      }
      return false
   },
   async deletePlayer(id) {

      const res = await validarPlayerID(id)
      if (res) {
         await Player.destroy({
            where: {
               id
            }
         })
         return true
      }
      return false
   },
   async validarPlayerID(id) {
      const playerId = await Player.findByPk(id)

      if (!playerId) {
         return false
      }
      return true
   }
}
