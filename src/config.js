global.EMAIL_TMPL = 'Olá, <strong>{0}</strong> seja bem vindo(a) ao Cartoleiros'
global.EMAIL_TMPL_RESET_PWD = 'Olá, para realizar o reset da sua senha entre <a href="{0}">aqui</a>'

module.exports = {
    sendgridKey: process.env.SENDGRID_KEY,
    containerConnectionString: process.env.AZURE_CONTAINER
}
