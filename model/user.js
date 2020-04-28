const {query} = require('../db/index')

async function getAdminUser() {
  let list = await query(`SELECT * FROM user `)

  return list
}

module.exports = {
  getAdminUser
}