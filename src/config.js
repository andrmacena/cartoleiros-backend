global.EMAIL_TMPL = 'Olá, <strong>{0}</strong> seja bem vindo(a) ao Cartoleiros'

module.exports = {
    sendgridKey: process.env.SENDGRID_KEY,
    containerConnectionString: process.env.AZURE_CONTAINER
}
