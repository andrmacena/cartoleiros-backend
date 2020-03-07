const User = require('../models/User')

module.exports = {

   async get() {
      return await User.findAll({ attributes: ['name', 'email', 'roles'] })
   },

   async createUser(data) {
      const { name, email, password, roles } = data
      
      const emailExists = await checkEmail(email)

      if (emailExists) {
         return false
      } else {

         const res = await User.create({
            name,
            email,
            password,
            roles
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
   }
}

checkEmail = async (email) => {

   const emailRes = await User.findOne({ where: { email } })

   if (emailRes) {
      return true
   }
   return false
}
