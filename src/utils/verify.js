const jwt = require('jsonwebtoken')

const verifyCredentials = (req, res, next) => {

  let token = req.headers['authorization']

  if (!token) {
    return res.status(403).send({
      ok: false,
      message: '403 Forbidden'
    })
  }

  token = token.replace('Bearer ', '')

  jwt.verify(token, process.env.SECRET_TOKEN, (err, token) => {
    if (err) {
      return res.status(401).send({
        ok: false,
        message: '401 Unauthorized',
        error: err
      })
    }

    req.token = token
    next()
  })

}

module.exports = {
  verifyCredentials
}