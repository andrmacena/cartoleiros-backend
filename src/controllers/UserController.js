const repository = require('../repositories/UserRepository')
const validator = require('../validators/FluentValidator')
const md5 = require('md5')
const authService = require('../services/authService')
const config = require('../config/database')


module.exports = {

   async getAllUsers(req, res, next) {
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
         await repository.createUser({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + config.password),
            roles: req.body.roles
         })

         return res.status(201).send('Cliente cadastrado com sucesso!')

      } catch (error) {
         res.status(500).send({ message: 'Falha ao processar a requisição' + error })

      }
   },
   async authenticate(req, res, next) {
      try {
         const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + config.password)
         })

         if (!user) {
            return res.status(404).send({ message: 'Usuário ou senha inválidos' })
         }

         const token = await authService.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
         })

         return res.status(201).send({
            token: token,
            data: {
               email: user.email,
               name: user.name
            }
         })
      } catch (error) {
         res.status(500).send({ message: 'Falha ao processar a requisição ' + error })
      }
   }

}
