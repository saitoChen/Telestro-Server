const { query } = require("../db/index");
const { isString } = require("../utils/vaildate");

async function handleArticle() {
  let list = await query(
    `SELECT article_id,create_time,author,title,description,tag_ids FROM article ORDER BY create_time desc`
  );

  return list;
}

async function handleHomeArticle() {
  let list = await query(
    `SELECT article_id,create_time,author,title,description,tag_ids,banner FROM article ORDER BY create_time desc LIMIT 5`
  );
  return list;
}

async function getArticleCount() {
  let count = await query(`SELECT COUNT(*) FROM article`);

  return count;
}

async function getArticleById(id) {
  let detail = await query(
    `SELECT create_time,author,title,content,description,tag_ids,banner FROM article WHERE article_id=${id}`
  );

  return detail;
}

async function postArticle(data) {
  let {
    article_id,
    create_time,
    author,
    title,
    description,
    content,
    tag_ids,
    banner,
  } = data;
  let result;
  if (banner) {
    result = await query(
      `INSERT INTO article (article_id, create_time, author, title, description, content, tag_ids, banner) VALUES (${article_id}, "${create_time}", "${author}", "${title}", "${description}", ${content}, '${tag_ids}', "${banner}")`
    );
  } else {
    result = await query(
      `INSERT INTO article (article_id, create_time, author, title, description, content, tag_ids) VALUES (${article_id}, "${create_time}", "${author}", "${title}", "${description}", ${content}, '${tag_ids}')`
    );
  }

  return result;
}

async function updateArticle(data) {
  let {
    article_id,
    create_time,
    author,
    title,
    description,
    content,
    tag_ids,
    banner,
  } = data;
  let result;
  if (banner) {
    result = await query(
      `UPDATE article SET author="${author}",title="${title}",description="${description}", banner="${banner}", tag_ids='${tag_ids}', content=${content} WHERE article_id=${article_id}`
    );
  } else {
    result = await query(
      `UPDATE article SET author="${author}",title="${title}",description="${description}", tag_ids='${tag_ids}', content=${content} WHERE article_id=${article_id}`
    );
  }
  return result;
}

async function uploadImg(data) {
  let { img_id, name, paths } = data;
  let result = await query(
    `INSERT INTO article_img (img_id, name, path) VALUES (${img_id}, "${name}","${paths}")`
  );

  return result;
}

async function deleteBanner(data) {
  let { name } = data;
  let result = await query(`DELETE FROM article_img WHERE name="${name}"`);
  return result;
}

async function getTags() {
  let result = await query(`SELECT * FROM tags`)
  return result
}

async function addTag(data) {
  let { tag_id, tag_name } = data;
  let result = await query(
    `INSERT INTO tags (tag_id, tag_name) VALUES ('${tag_id}', '${tag_name}')`
  );
  return result;
}
module.exports = {
  handleArticle,
  getArticleCount,
  handleHomeArticle,
  getArticleById,
  postArticle,
  uploadImg,
  updateArticle,
  deleteBanner,
  getTags,
  addTag
};
