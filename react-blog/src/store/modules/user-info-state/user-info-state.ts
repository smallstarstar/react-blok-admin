const UserInfoState = {
    state: {
        userInfo: {}
    },
    mutations: {
        SAVE_USERINFO_STATE(state: any, userInfo: any) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        saveUserInfo({ commit }: any, userInfo: any) {
            commit('SAVE_USERINFO_STATE', userInfo);
        }
    }
}

export default UserInfoState;