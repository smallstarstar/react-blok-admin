const CommonTitleStore = {
    state: {
        titleName: '',
    },
    mutations: {
        SAVE_TITLE_NAME(state: any, titleName: any) {
            state.titleName = titleName;
        }
    },
    actions: {
        saveTitleName({ commit }: any, titleName: any) {
            commit('SAVE_TITLE_NAME', titleName);
        }
    }
}

export default CommonTitleStore;