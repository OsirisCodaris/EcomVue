"use strict";
/* eslint-disable */ 
import Vue from "vue";
import axios from "axios";
import store from "../store/index"
import router from "../router/index"


let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "http://localhost:5076/api/",
  headers:{
    "Access-Control-Allow-Origin": "*",
  },
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    const token = store.state.token;
    if(token){
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log()
    if(error.response.status === 401 && error.response.config.url != "/authentification" ){
      store.dispatch('settoken',null);
      router.push('/login')
      return Promise.reject(error);
    }
    
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, _options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default _axios;
