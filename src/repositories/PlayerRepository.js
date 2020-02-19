const Player = require('../models/Player')

module.exports = {

   async get() {

      return await Player.findAll({ attributes: ['id', 'name', 'position', 'points'] })
   },

   async getById(id) {

      return await Player.findByPk(id)

   },

   async createPlayer(data) {
      await Player.create({
         name: data.name,
         age: data.age,
         position: data.position,
         points: 0
      })
   },
   async updatePlayer(id, data) {

      const res = await validarPlayerID(id)
      if (res) {
         await Player.update({
            name: data.name,
            age: data.age,
            position: data.position
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
   }
}


validarPlayerID = async (id) => {
   const playerId = await Player.findByPk(id)

   if (!playerId) {
      return false
   }
   return true
}
