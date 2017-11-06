import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import store from './store.js'
import FBridge from '../src/assets/lib/FBridge.js'
import Promise from 'core-js/es6/promise';


import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store:store,
  render: (h) => h(App),
})



window.document.addEventListener('DOMContentLoaded', function () {
    if(FBridge.env.platform === 'app') {
        WBAPP.setWebLog(
            'show',
            'app_gycs',
            '1,70134',
            '',);
    }
    FBridge.share.config({
        title:'测试：租什么样的房子，你的幸福感更高？',
        content: '房子租对了，幸福指数直线飙升！快来测一测吧！',
        imgUrl:'https://img.58cdn.com.cn/fangrs/img/40d22deaabe6b63e079cf57a02529658.jpg',
        url:'https://activityhouse.m.58.com/activity/zufang_game_page',
        callback:function (state,platform) {
            var plat = FBridge.env.platform;
            FBridge.track.send({
                logMsg:'gycsysjshare-click',
                pageType:plat + '_gycs',
                cate:'1,70134',
                appPrefix : 'app-',
                wxPrefix: 'wx-',
                // mPrefix:string = 'm-'
            });
        }
    });
}, false);



