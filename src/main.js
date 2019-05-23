import Vue from 'vue'
import App from './App'
import store from './store'

// 引入路由器
import router from './router/index'

import Vuex from 'vuex'

// 导入YDUI
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);

// 导入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 导入 MUI 的样式
import './common/mui/css/mui.min.css'
// 导入扩展图标样式
import './common/mui/css/icons-extra.css'

// 配置图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.jpg'
Vue.use(VueLazyload, {
  loading
  // loading: loading
});

new Vue({
  el: '#app',
  router,
  store,
  render: h=>h(App)
})
