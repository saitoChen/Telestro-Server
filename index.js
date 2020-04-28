const Koa = require('koa')
const app = new Koa()
const path = require('path')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router');
const koajwt = require('koa-jwt');
const multer = require('koa-multer');
const static = require('koa-static')
const jsonwebtoken = require('jsonwebtoken');
const router = new Router()
const {useRouter} = require('./utils/router')
const {apiGetArticlesList, apigetArticleDetail, apiGetAdminArticlesList,
 apiGetAdminArticleDetail, apiPostArticle, apiPostAdminImg, apiUpdateAdminArticle} = require('./route/articles')
const {apiLogin} = require('./route/user')


const SECRET = 'shredded-butter';

app.use(bodyParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,'/public/imgs'))
  },
  filename: function (req, file, cb) {
      let type = file.originalname.split('.')[1]
      cb(null, `${Date.now().toString(16)}.${type}`)
  }
})

const limits = {
  fields: 10,//非文件字段的数量
  fileSize: 5 * 1024 * 1024,//文件大小 单位 b
  files: 1//文件数量
}
const upload = multer({storage,limits})

app.use(static(
path.join( __dirname, 'public')
))

// 中间件对token进行验证
app.use(async (ctx, next) => {
  // let token = ctx.header.authorization;
  // let payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], SECRET);
  return next().catch((err) => {
      if (err.status === 401) {
          ctx.status = 401;
          ctx.body = {
              code: 401,
              msg: err.message
          }
      } else {
          throw err;
      }
  })
});

app.use(koajwt({ secret: SECRET }).unless({
  // 登录接口不需要验证
  path: [/^\/api\/login/, /^\/api\/article/, /^\/public/]
}));

useRouter(app, apiGetArticlesList(router))
useRouter(app, apigetArticleDetail(router))
useRouter(app, apiGetAdminArticlesList(router))
useRouter(app, apiGetAdminArticleDetail(router))
useRouter(app, apiPostAdminImg(router, upload))
useRouter(app, apiPostArticle(router))
useRouter(app, apiUpdateAdminArticle(router))
useRouter(app, apiLogin(router, SECRET))

app.listen(3000)