const Player = require('../models/Player')

module.exports = {

   async get() {

      return await Player.findAll({ attributes: ['name', 'position', 'points'] })
   },

   async createPlayer(data) {
       await Player.create({
         name: data.name,
         age: data.age,
         position: data.position,
         points
      })
   }
}
