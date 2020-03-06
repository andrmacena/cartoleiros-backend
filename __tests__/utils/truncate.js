const connection = require('../../src/database/index')

module.exports = () => {
   return Promise.all(Object.keys(connection.models).map(table => {
      return connection.models[table].destroy({ truncate: true, force: true, cascade: true })
   }))
}
