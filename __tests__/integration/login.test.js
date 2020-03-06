const app = require('../../src/app')
const UserRepository = require('../../src/repositories/UserRepository')

const truncate = require('../utils/truncate')
const config = require('../../src/config/database')

//external packages
const request = require('supertest')
const md5 = require('md5')


describe('Authentication', () => {
   beforeEach(async () => {
      await truncate()
   })

   it('should return status 201 when user authenticated with valid credentials', async () => {

      userReq = {
         name: 'André',
         email: 'andremacena@gmail.com',
         password: md5('andremacena' + config.password),
         roles: 'user'
      }

      console.log(userReq.password)

      const user = await UserRepository.createUser(userReq)

      console.log(user.password)

      const response = await request(app)
         .post('/users/authenticate')
         .send({
            email: user.email,
            password: user.password
         })

         //TODO receber o password correto, pois está enviando um e retornando outro

      expect(response.status).toBe(201)


   })

   it('should return status 401 when user authenticated with invalid credentials', async () => {
      userReq = {
         name: 'André',
         email: 'andremacena@gmail.com',
         password: 'andremacena',
         roles: 'user'
      }

      const user = await UserRepository.createUser(userReq)

      const response = await request(app)
         .post('/users/authenticate')
         .send({
            email: user.email,
            password: 'user.password'
         })

      expect(response.status).toBe(401)
   })
})
