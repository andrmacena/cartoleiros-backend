const md5 = require('md5')
const azureStorage = require('azure-storage')
const Guid = require('guid')

const repository = require('../repositories/UserRepository')
const validator = require('../validators/FluentValidator')
const authService = require('../services/authService')
const emailService = require('../services/emailService')
const config = require('../config/database')
const configAzure = require('../config')




module.exports = {

   async getAllUsers(req, res, next) {
      const token = req.body.token || req.query.token || req.headers['x-access-token']

      const data = await authService.decodeToken(token)

      if (!data) {
         return res.status(403).send('Conexão perdida, faça o login novamente')
      }

      try {
         const user = await repository.get()
         return res.status(200).send(user)

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   },
   async createUser(req, res, next) {

      const validation = new validator()
      validation.hasMinLen(req.body.name, 3, 'O nome deve possuir pelo menos 3 caracteres')
      validation.isEmail(req.body.email, 'Email inválido')
      validation.hasMinLen(req.body.password, 6, 'A senha deve possuir pelo menos 6 caracteres')

      if (!validation.isValid()) {
         return res.status(400).send(validation.errors()).end()

      }

      try {
         if (req.body.profile_url) {

            const blobService = azureStorage.createBlobService(configAzure.containerConnectionString)

            let filename = Guid.raw().toString() + '.jpg'
            let rawdata = req.body.profile_url
            let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
            let type = matches[1]
            let buffer = new Buffer(matches[2], 'base64')

            await blobService.createAppendBlobFromText('user-profile-images', filename, buffer, { contentType: type },
               function (error, result, response) {
                  if (error) {
                     filename = 'default-userProfile.png'
                  }
               })
            await repository.createUser({
               name: req.body.name,
               email: req.body.email,
               password: md5(req.body.password + config.password),
               roles: req.body.roles,
               profile_url: 'https://cartoleiroslogo.blob.core.windows.net/user-profile-images/' + filename
            })
         }

         const user = await repository.createUser({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + config.password),
            roles: req.body.roles,
         })



         if (!user) {
            return res.status(202).send({ message: 'Email já cadastrado, por favor utilize outro' })
         }

         emailService.sendEmail(req.body.email, "Bem vindo ao Cartoleiros!", global.EMAIL_TMPL.replace('{0}', req.body.name))

         return res.status(201).send({ message: 'Usuário cadastrado com sucesso!' })

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   },
   async authenticate(req, res, next) {
      try {
         const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + config.password)
         })

         if (!user) {
            return res.status(401).send({ message: 'Usuário ou senha inválidos' })
         }

         const token = await authService.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
         })

         return res.status(200).send({
            token: token,
            data: {
               email: user.email,
               name: user.name
            }
         })
      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })
      }
   },
   async updateUser(req, res, next) {
      const token = req.body.token || req.query.token || req.headers['x-access-token']

      const data = await authService.decodeToken(token)

      if (!data) {
         return res.status(401).send('Conexão perdida, faça o login novamente')
      }

      try {
         const result = await repository.updateUser(data.id, req.body)
         if (result) {
            return res.status(200).send({ message: 'Alteração realizada com sucesso!' })
         }
      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }

   },
   async resetPassword(req, res, next) {
      const data = req.body

      try {

         await repository.resetPassword(data.email, md5(data.password + config.password))

         return res.status(200).send({ message: 'Senha alterada' })

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   }

}
