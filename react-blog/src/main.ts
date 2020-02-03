import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/vender/http-client';
import '@/assets/icon/index.css';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 国际化问价配置
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@/languages/cn/CN.json'),
    'en': require('@/languages/en/EN.json')
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
