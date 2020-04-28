const {query} = require('../db/index')
const {isString} = require('../utils/vaildate')

async function handleArticle() {
  let list = await query(`SELECT article_id,create_time,author,title,description FROM article ORDER BY create_time desc`)

  return list 
}

async function handleHomeArticle() {
  let list = await query(`SELECT article_id,create_time,author,title,description FROM article ORDER BY create_time desc LIMIT 5`)
  return list
}

async function getArticleCount() {
  let count = await query(`SELECT COUNT(*) FROM article`)

  return count
}

async function getArticleById(id) {
  let detail = await query(`SELECT create_time,author,title,content,description FROM article WHERE article_id=${id}`)

  return detail
}

async function postArticle(data){
  let {article_id, create_time, author, title, description, content} = data
  let result = await query(`INSERT INTO article (article_id, create_time, author, title, description, content) VALUES (${article_id}, "${create_time}", "${author}", "${title}", "${description}", ${content})`)
  
  return result
}

async function updateArticle(data){
  let {article_id, create_time, author, title, description, content} = data
  let result = query(`UPDATE article SET author="${author}",title="${title}",description="${description}",content=${content} WHERE article_id=${article_id}`)
  return result
}

async function uploadImg(data){
  let {img_id, name, path} = data
  let result = await query(`INSERT INTO article_img (img_id, name, path) VALUES (${img_id}, "${name}","${path}")`)

  return result
}

module.exports = {
  handleArticle,
  getArticleCount,
  handleHomeArticle,
  getArticleById,
  postArticle,
  uploadImg,
  updateArticle
}