const {getAdminUser} = require('../model/user')
const jsonwebtoken = require('jsonwebtoken');

async function loginAdmin(ctx, SECRET){
  let user = await getAdminUser()
  let {name, password, user_id} = user[0]
  if (ctx.request.body.username === name && ctx.request.body.password === password) {
    ctx.body = {
      success: true,
      msg: '登录成功',
      token: jsonwebtoken.sign(
        { name, id: user_id },  // 加密userToken
        SECRET,
        { expiresIn: '6h' }
    )
    }
  } else {
    ctx.body = {
      success: false,
      msg: '用户名或密码错误'
    }
  }
}

module.exports = {
  loginAdmin
}