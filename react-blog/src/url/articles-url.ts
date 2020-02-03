const articlesUrl = {
    // 获取文章信息
    getArticlesInfo: '/api/v1/articleInfo/{page}/{size}',
    // 发布文章
    saveArticles: '/api/v1/saveArticleInfo',
    // 用户登录
    userLogin: '/api/v1/login/{userName}/{password}',
    // 获取文章类型的接口
    getArticleTypeList: '/api/v1/listTypeName',
    // 查询个人的博客
    getOwnArticleBlok: '/api/v1/myArticleInfo/{id}/{page}/{size}',
    deletePersonBlok: '/api/v1/deleteArticle/blok/{id}/person/{personId}'
}
export default articlesUrl;