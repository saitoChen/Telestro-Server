const fs = require("fs");
const path = require("path");
const {
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
} = require("../model/articles");

const { isString } = require("../utils/vaildate");
// 普通用户获取文章
async function getArticlesList(ctx) {
  let result;

  if (ctx.request.query.isHomePage) {
    result = await handleHomeArticle();
  } else {
    result = await handleArticle();
  }

  let count = await getArticleCount();
  result.forEach(item => {
    if (item.tag_ids) {
      item.tag_ids = JSON.parse(item.tag_ids)
    }
  })
  ctx.body = {
    success: true,
    data: {
      list: result,
      count: count[0]["COUNT(*)"],
    },
  };
}

// 普通用户获取单篇文章得内容
async function getArticleDetail(ctx) {
  let article;
  if (ctx.request.query.article_id) {
    try {
      article = await getArticleById(ctx.request.query.article_id);
      if (article[0]) {
        let {
          create_time,
          author,
          title,
          content,
          description,
          tag_ids,
          banner,
        } = article[0];
        ctx.body = {
          success: true,
          data: {
            create_time,
            author,
            title,
            content,
            description,
            tag_ids: tag_ids ? JSON.parse(tag_ids) : '',
            banner,
          },
        };
      } else {
        ctx.body = {
          success: false,
          msg: "未找到文章",
        };
      }
    } catch (err) {
      return Promise.reject(err);
    }
  } else {
    ctx.status = 400;
  }
}

async function postNewArticle(ctx) {
  let {
    create_time,
    author,
    title,
    description,
    content,
    banner,
    tag_ids
  } = ctx.request.body;
  if (
    isString(content) &&
    isString(description) &&
    create_time &&
    author &&
    title &&
    description &&
    content
  ) {
    let article_id = String(Math.floor(Math.random() * 10)) + +new Date();
    if (!tag_ids) tag_ids = '[]'
    let result = await postArticle({
      article_id,
      create_time,
      author,
      title,
      description,
      content,
      tag_ids,
      banner: banner ? banner : "",
    });
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        msg: "保存成功",
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      success: false,
      msg: "参数错误",
    };
  }
}

async function updateOldArticle(ctx) {
  let {
    article_id,
    author,
    title,
    description,
    content,
    banner,
    tag_ids
  } = ctx.request.body;

  if (article_id && author && title && description && content) {
    if (!tag_ids) tag_ids = '[]'
    let result = await updateArticle({
      article_id,
      author,
      title,
      description,
      content,
      tag_ids,
      banner: banner ? banner : "",
    });
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        msg: "保存成功",
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      success: false,
      msg: "参数错误",
    };
  }
}

async function getUploadImg(ctx) {
  if (ctx.req.file.filename) {
    let filename = ctx.req.file.filename;
    let paths =
      process.env.NODE_env === "dev"
        ? `http://localhost:3000/imgs/${filename}`
        : `http://www.shreddedbutter.xyz/imgs/${filename}`;
    let result = await uploadImg({
      img_id: +new Date(),
      name: filename,
      paths,
    });
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        data: {
          paths,
        },
      };
    }
  } else {
    ctx.body = {
      success: false,
      msg: "参数错误",
    };
  }
}

async function deleteImg(ctx) {
  if (ctx.request.query.name) {
    let name = ctx.request.query.name;
    fs.unlink(path.join(__dirname, `../public/imgs/${name}`), function (error) {
      if (error) {
        return false;
      }
      console.log("图片删除成功");
    });
    let result = await deleteBanner({ name });
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        msg: "删除成功",
      };
    }
  } else {
    ctx.body = {
      success: false,
      msg: "参数错误",
    };
  }
}

async function getTagsList(ctx){
  let result = await getTags()
  ctx.body = {
    success: true,
    data: {
      tags: result
    }
  }
}

async function addNewTags(ctx) {

  let {tag_id, tag_name} = ctx.request.body
  if (tag_id && tag_name) {
    let result = await addTag({
      tag_id,
      tag_name
    })
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        msg: "新建成功",
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      success: false,
      msg: "参数错误",
    };
  }
}

module.exports = {
  getArticlesList,
  getArticleDetail,
  postNewArticle,
  getUploadImg,
  updateOldArticle,
  deleteImg,
  getTagsList,
  addNewTags
};
