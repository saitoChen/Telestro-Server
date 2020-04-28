const {query} = require('../db/index.js')

function apiTest(router) {
  router.get('/api/test', async(ctx) => {
    let a = await query(`SELECT * FROM user`)
    console.log(a)
    ctx.body = {
      test: 111
    }
  })

  return router
}

module.exports = {
  apiTest
}