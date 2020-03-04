const request = require('supertest')
const UserController = require('../../src/controllers/UserController')
const UserRepository = require('../../src/repositories/UserRepository')
//const truncate = require('../utils/truncate')

const app = require('../../src/app')

describe('Authentication', () => {
   // beforeEach(async () => {
   //    await truncate()
   // })

   it('should return status 201 when user authenticated with valid credentials', async () => {

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
            password: user.password
         })

         console.log(response.statusCode)

      expect(response.statusCode).toBe(201)
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

      expect(response.statusCode).toBe(401)
   })
})
