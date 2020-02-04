const ArticleStore = {
    state: {
        articleInfo: {}
    },
    mutations: {
        SAVE_ARTICLE_INFO(state: any, articleInfo: any) {
            state.articleInfo = articleInfo;
        }
    },
    actions: {
        saveArticleInfo({ commit }: any, payload: any) {
            commit('SAVE_ARTICLE_INFO', payload);
        }
    }
}

export default ArticleStore;