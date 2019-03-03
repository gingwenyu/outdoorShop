// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import 'jquery';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'; 

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);

axios.defaults.withCredentials=true;

Vue.component('Loading', Loading);        //在全域啟用
Vue.filter('currency', currencyFilter);

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next);
  // ...
  if (to.meta.requiresAuth){
    //console.log('這裡需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`;    
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      }else{
        next({
          path:'/login',
        })       
      }
    });   
  }else{
    next();
  }
  
});

