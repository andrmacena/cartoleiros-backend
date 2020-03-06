const app = require('../../src/app')
const truncate = require('../utils/truncate')

//external packages
const request = require('supertest')


describe('Authentication', () => {
   beforeEach(async () => {
      await truncate()
   })

   it('should return status 201 when user authenticated with valid credentials', async () => {

      userReq = {
         name: 'André Macena',
         email: 'andremacena15@gmail.com',
         password: 'andremacena10',
         roles: 'user'
      }

      const responseCreate = await request(app)
      .post('/users')
      .send(userReq)

      const response = await request(app)
         .post('/users/authenticate')
         .send({
            email: responseCreate.body.email,
            password: userReq.password
         })

      expect(response.status).toBe(201)
   })

   it('should return status 401 when user authenticated with invalid credentials', async () => {
      userReq = {
         name: 'André',
         email: 'andremacena@gmail.com',
         password: 'andremacena',
         roles: 'user'
      }

      const responseCreate = await request(app)
      .post('/users')
      .send(userReq)

      const response = await request(app)
         .post('/users/authenticate')
         .send({
            email: responseCreate.body.email,
            password: 'user.password'
         })

      expect(response.status).toBe(401)
   })
})
