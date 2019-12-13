import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import md5 from "js-md5";
import Antd from "ant-design-vue";
import { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);
Vue.use(message);

Vue.config.productionTip = false;

Vue.prototype.$message = message;
message.config({
  duration: 2,
  maxCount: 1
});
//把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
//不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = Axios;
Vue.prototype.$md5 = md5;
//使每次请求都会带一个 /api 前缀
Axios.defaults.baseURL = "http://localhost:8024/api";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
