const jwt = require('jsonwebtoken')
const secret = 'ocuqpvgtta'

module.exports = {
  getToken: async user => {
    try {
      return await jwt.sign({ user }, secret)
    } catch (err) {
      throw err
    }
  },
  verifyToken: async token => {
    try {
      return await jwt.verify(token, secret)
    } catch (err) {
      return err
    }
  }
}
