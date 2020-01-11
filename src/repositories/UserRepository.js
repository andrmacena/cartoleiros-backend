const User = require('../models/User')

module.exports = {

   async get() {
      return await User.findAll({ attributes: ['name', 'email', 'roles'] })
   },

   async createUser(data) {
      const { name, email, password, roles } = data
       await User.create({
         name,
         email,
         password,
         roles
      })
   }
}
