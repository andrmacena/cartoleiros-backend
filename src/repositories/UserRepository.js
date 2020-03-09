const User = require('../models/User')

module.exports = {

   async get() {
      return await User.findAll({ attributes: ['name', 'email', 'roles'] })
   },

   async createUser(data) {
      const { name, email, password, roles, profile_url } = data

      const emailExists = await checkEmail(email)

      if (emailExists) {
         return false
      } else {

         const res = await User.create({
            name,
            email,
            password,
            roles,
            profile_url
         })

         return res
      }
   },

   async authenticate(data) {
      const res = await User.findOne({
         where: {
            email: data.email,
            password: data.password
         }
      })
      return res
   },
   async updateUser(id, data) {
      await User.update({
         name: data.name,
         email: data.email,
         profile_url: data.profile_url

      }, { where: { id } })

      return true
   }
}

checkEmail = async (email) => {

   const emailRes = await User.findOne({ where: { email } })

   if (emailRes) {
      return true
   }
   return false
}
