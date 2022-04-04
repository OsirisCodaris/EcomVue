import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    carts: [],
    idcarts: [],
    token: null,
  },
  getters: {},
  mutations: {
    additems(state, item) {
      state.carts.push(item);
      state.idcarts.push(item.idproduct);
    },
    removeitems(state, item) {
      var id = state.idcarts.indexOf(item.idproduct);
      state.carts.splice(id, 1);
      state.idcarts.splice(id, 1);
    },
    settoken(state, token) {
      state.token = token;
    },
  },
  actions: {
    additems({ commit }, item) {
      commit("additems", item);
    },
    removeitems({ commit }, item) {
      commit("removeitems", item);
    },
    settoken({ commit }, token) {
      commit("settoken", token);
    },
  },
  modules: {},
});
