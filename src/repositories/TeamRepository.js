const Team = require('../models/Team')

module.exports = {

   async createTeam(data) {
      const { name, logo_url, user_id } = data

      await Team.create({
         name,
         logo_url,
         user_id
      })

   }
}
