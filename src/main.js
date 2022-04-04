import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
