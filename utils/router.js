function useRouter(app, router) {
  app
    .use(router.routes())
    .use(router.allowedMethods())
}

module.exports = {
  useRouter
}