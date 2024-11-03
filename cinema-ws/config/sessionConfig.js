const session = require('express-sessions')

const sessionMiddleware = session({
    secret: 'dummy-secret',
    resave: false,
    saveUnitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
})

module.exports = sessionMiddleware;