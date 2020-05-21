const {
  getArticlesList,
  getArticleDetail,
  postNewArticle,
  getUploadImg,
  updateOldArticle,
  deleteImg,
  getTagsList,
  addNewTags
} = require("../controller/articles");

function apiGetArticlesList(router) {
  router.get("/api/article/getArticleList", async (ctx) => {
    await getArticlesList(ctx);
  });
  return router;
}

function apigetArticleDetail(router) {
  router.get("/api/article/getArticleDetail", async (ctx) => {
    await getArticleDetail(ctx);
  });
  return router;
}

function apiGetAdminArticlesList(router) {
  router.get("/api/admin/getArticleList", async (ctx) => {
    await getArticlesList(ctx);
  });
  return router;
}

function apiGetAdminArticleDetail(router) {
  router.get("/api/admin/getArticleDetail", async (ctx) => {
    await getArticleDetail(ctx);
  });
  return router;
}

function apiPostArticle(router) {
  router.post("/api/admin/postArticle", async (ctx) => {
    await postNewArticle(ctx);
  });
  return router;
}

function apiPostAdminImg(router, upload) {
  router.post("/api/admin/postImg", upload.single("image"), async (ctx) => {
    await getUploadImg(ctx);
  });
  return router;
}

function apiPostAdminBanner(router, upload) {
  router.post("/api/admin/banner", upload.single("file"), async (ctx) => {
    await getUploadImg(ctx);
  });
  return router;
}

function apiUpdateAdminArticle(router) {
  router.put("/api/admin/updateArticle", async (ctx) => {
    await updateOldArticle(ctx);
  });
  return router;
}

function apiDeleteAdminImg(router) {
  router.delete("/api/admin/deleteImg", async (ctx) => {
    await deleteImg(ctx);
  });
  return router;
}

function apiGetTagsList(router) {
  router.get("/api/admin/tagsList", async (ctx) => {
    await getTagsList(ctx)
  })
  return router
}

function apiPostNewTag(router) {
  router.post("/api/admin/newTag", async (ctx) => {
    await addNewTags(ctx)
  })
  return router
}

module.exports = {
  apiGetArticlesList,
  apigetArticleDetail,
  apiGetAdminArticlesList,
  apiGetAdminArticleDetail,
  apiPostAdminImg,
  apiPostAdminBanner,
  apiPostArticle,
  apiUpdateAdminArticle,
  apiDeleteAdminImg,
  apiGetTagsList,
  apiPostNewTag
};
