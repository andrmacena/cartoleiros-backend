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
   },

   async authenticate(data) {
      const res = await User.findOne({
         where: {
            email: data.email,
            password: data.password
         }
      })
      return res
   }
}
