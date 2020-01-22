const repository = require('../repositories/PlayerRepository')
const validator = require('../validators/FluentValidator')

module.exports = {

   async getAllPlayers(req, res, next) {

      try {
         const user = await repository.get()
         return res.status(200).send(user)

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }




   }
}