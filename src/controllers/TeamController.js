const TeamRepository = require('../repositories/TeamRepository')
const validator = require('../validators/FluentValidator')
const azureStorage = require('azure-storage')
const Guid = require('guid')
const authService = require('../services/authService')
const config = require('../config')

module.exports = {

   async getAllTeams(req, res, next) {

   },
   async createTeam(req, res, next) {
      const token = req.body.token || req.query.token || req.headers['x-access-token']

      //retorna json atrelado ao token com dados do customer
      const data = await authService.decodeToken(token)
      const { name, logo_url } = req.body

      const contract = new validator()
      contract.hasMinLen(name, 3, "O nome do time deve conter pelo menos 3 caracteres")
      contract.isRequired(name, "O nome do time é obrigatório")
      contract.isRequired(logo_url, "O logo do time é obrigatório")

      if (!contract.isValid()) {
         return res.status(400).send(contract.errors()).end
      }

      try {
         const blobService = azureStorage.createBlobService(config.containerConnectionString)

         let filename = Guid.raw().toString() + '.jpg'
         let rawdata = req.body.logo_url
         let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
         let type = matches[1]
         let buffer = new Buffer(matches[2], 'base64')

         await blobService.createAppendBlobFromText('team-images', filename, buffer, { contentType: type },
            function (error, result, response) {
               if (error) {
                  filename = 'default-product.png'
               }
            })

         await TeamRepository.createTeam({
            name,
            logo_url: 'https://cartoleiroslogo.blob.core.windows.net/team-images/' + filename,
            user_id: data.id
         })

         return res.status(201).send({ message: 'Time criado com sucesso!' })

      } catch (error) {
         res.status(500).send({ message: 'Falha ao processar a requisição ' + error })
      }

   }
}
