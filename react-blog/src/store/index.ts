import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import getters from '@/store/getters';
import UserInfoState from '@/store/modules/user-info-state/user-info-state';
import CommonTitleStore from '@/store/modules/common-title-store/common-title-store';

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    UserInfoState,
    CommonTitleStore
  },
  getters,
  plugins: debug ? [createLogger()] : []
})
