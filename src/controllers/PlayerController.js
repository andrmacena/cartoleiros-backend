const azureStorage = require('azure-storage')
const Guid = require('guid')

const repository = require('../repositories/PlayerRepository')
const validator = require('../validators/FluentValidator')
const authService = require('../services/authService')

const configAzure = require('../config')

module.exports = {

   async getAllPlayers(req, res, next) {
      const token = req.body.token || req.query.token || req.headers['x-access-token']

      const data = await authService.decodeToken(token)

      if (!data) {
         return res.status(403).send({ message: 'Conexão perdida, faça o login novamente' })
      }

      try {
         const user = await repository.get()
         return res.status(200).send(user)

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   },
   async createPlayer(req, res, next) {
      const token = req.body.token || req.query.token || req.headers['x-access-token']

      const data = await authService.decodeToken(token)

      if (!data) {
         return res.status(403).send({ message: 'Conexão perdida, faça o login novamente' })
      }

      const contract = new validator()
      contract.hasMinLen(req.body.name, 3, 'O nome do jogador deve possuir pelo menos 3 caracteres')
      contract.isRequired(req.body.name, 'O nome do jogador é obrigatório')
      contract.isRequired(req.body.position, 'A posição do jogador é obrigatória')
      contract.isRequired(req.body.age, 'A idade do jogador é obrigatória')

      if (!contract.isValid()) {
         return res.status(400).send(contract.errors()).end()
      }

      try {
         const blobService = azureStorage.createBlobService(configAzure.containerConnectionString)

         let filename = Guid.raw().toString() + '.jpg'
         let rawdata = req.body.player_url
         let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
         let type = matches[1]
         let buffer = new Buffer(matches[2], 'base64')

         await blobService.createAppendBlobFromText('player-img', filename, buffer, { contentType: type },
            function (error, result, response) {
               if (error) {
                  filename = 'default-playerProfile.png'
               }
            })

         await repository.createPlayer({
            name: req.body.name,
            age: req.body.age,
            position: req.body.position,
            player_url: 'https://cartoleiroslogo.blob.core.windows.net/player-img/' + filename
         })

         return res.status(201).send({ message: 'Jogador cadastrado com sucesso!' })

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   },
   async updatePlayer(req, res, next) {
      const token = req.body.token || req.query.token || req.headers['x-access-token']

      const data = await authService.decodeToken(token)

      if (!data) {
         return res.status(403).send({ message: 'Conexão perdida, faça o login novamente' })
      }

      try {
         const result = await repository.updatePlayer(req.params.id, req.body)
         if (result) {
            return res.status(201).send({ message: 'Jogador alterado com sucesso!' })

         } else {
            return res.status(404).send({ message: 'Jogador não encontrado' })
         }
      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   },
   async deletePlayer(req, res, net) {
      const token = req.body.token || req.query.token || req.headers['x-access-token']

      const data = await authService.decodeToken(token)

      if (!data) {
         return res.status(403).send({ message: 'Conexão perdida, faça o login novamente' })
      }

      try {
         const result = await repository.deletePlayer(req.params.id)

         if (result) {
            return res.status(200).send({ message: 'Jogador deletado com sucesso!' })

         } else {
            return res.status(404).send({ message: 'Jogador não encontrado' })
         }

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   }
}
