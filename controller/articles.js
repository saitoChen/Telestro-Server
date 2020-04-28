const {handleArticle, getArticleCount, handleHomeArticle, getArticleById, postArticle, uploadImg, updateArticle} = require('../model/articles')

const {isString} = require('../utils/vaildate')

// 普通用户获取文章
async function getArticlesList(ctx) {

  let result

  if (ctx.request.query.isHomePage) {
    result = await handleHomeArticle()
  } else {
    result = await handleArticle()
  }

  let count = await getArticleCount() 

  ctx.body = {
    success: true,
    data: {
      list: result,
      count: count[0]['COUNT(*)']
    }
  }
}


// 普通用户获取单篇文章得内容
async function getArticleDetail(ctx){
  let article
  if (ctx.request.query.article_id) {
    try {
      article = await getArticleById(ctx.request.query.article_id)
      if (article[0]) {
        let {create_time, author, title, content, description} = article[0]
        ctx.body = {
          success: true,
          data: {
            create_time,
            author,
            title,
            content,
            description
          }
        }
      } else {
        ctx.body = {
          success: false,
          msg: '未找到文章'
        }
      }
    } catch(err) {
      return Promise.reject(err)
    }
  } else {
    ctx.status = 400
  }

}


async function postNewArticle(ctx) {
  let {create_time, author, title, description, content} = ctx.request.body
  if (isString(content) && isString(description) && create_time && author && title && description && content) {
    let article_id = String(Math.floor(Math.random()*10)) + (+new Date())
    let result = await postArticle({
      article_id,
      create_time,
      author,
      title,
      description,
      content
    })
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        msg: '保存成功'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      msg: '参数错误'
    }    
  }
}

async function updateOldArticle(ctx) {
  let {article_id, author, title, description, content} = ctx.request.body

  if (article_id && author && title && description && content) {
    let result = await updateArticle({
      article_id, 
      author, 
      title, 
      description, 
      content
    })
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        msg: '保存成功'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      msg: '参数错误'
    }  
  }
}

async function getUploadImg(ctx) {
  if (ctx.req.file.filename) {
    let filename = ctx.req.file.filename
    let path = process.env.NODE_env === 'dev' ? `http://localhost:3000/imgs/${filename}` : `http://www.shreddedbutter.xyz/imgs/${filename}`
    let result = await uploadImg({
      img_id: +new Date(),
      name: filename,
      path
    })
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        data: {
          path
        }
      }
    }
  } else {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
  }
}


module.exports = {
  getArticlesList,
  getArticleDetail,
  postNewArticle,
  getUploadImg,
  updateOldArticle
}