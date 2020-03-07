const jwt = require('jsonwebtoken')
const config = require('../config/database')

module.exports = {
    async generateToken(data) {
        return jwt.sign(data, config.password, { expiresIn: '1d' })

    },

    async decodeToken(token) {
        var data = await jwt.verify(token, config.password)

        return data
    },
    authorize(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token']

        if (!token) {
            res.status(401).json({ message: 'Acesso restrito' })
        } else {
            jwt.verify(token, config.password, (error, decoded) => {
                if (error) {
                    res.status(401).json({ message: 'Token inválido' })
                } else {
                    next()
                }
            })

        }
    },
    async isAdmin(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token']
        if (!token) {
            res.status(401).json({ message: 'Acesso restrito' })
        } else {
            jwt.verify(token, config.password, (error, decoded) => {
                if (error) {
                    res.status(401).json({ message: 'Token inválido' })
                } else {
                    if (decoded.roles.includes('admin')) {
                        next()
                    } else {
                        res.status(403).json({ message: 'Esta funcionalidade é restrita para administradores' })

                    }
                }
            })
        }

    }
}