const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  encryptPassword: async password => {
    try {
      return await bcrypt.hash(password, saltRounds)
    } catch (err) {
      throw err
    }
  },
  comparePassword: async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash)
    } catch (err) {
      throw err
    }
  }
}
