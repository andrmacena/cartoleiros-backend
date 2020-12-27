const emailService = require('../services/emailService')

module.exports = {

   async sendEmailResetPassword(req, res, next) {
      const { email } = req.body

      try {
         emailService.sendEmail(email, "Reset Password", global.EMAIL_TMPL_RESET_PWD.replace('{0}', 'www.google.com'))


         return res.status(200).send()

      } catch (error) {
         return res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

      }
   }
}
