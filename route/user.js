const {loginAdmin} = require('../controller/user')

function apiLogin(router, SECRET){
  router.post('/api/login', async(ctx) => {
    await loginAdmin(ctx, SECRET)
  })

  return router
}

module.exports = {
  apiLogin
}