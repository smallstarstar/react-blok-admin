const getter = {
    userInfo: (state: any) => state.UserInfoState.userInfo,
    titleName: (state: any) => state.CommonTitleStore.titleName,
    articleMessage: (state: any) => state.ArticleStore.articleInfo
}

export default getter;