const User = require('../../src/models/User')

module.exports = () => {
   return Promise.all(Object.keys(User.sequelize.models).map(table => {
      return User.sequelize.models[table].destroy({ truncate: true, force: true })
   }))
}
