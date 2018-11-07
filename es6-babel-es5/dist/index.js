'use strict';

/*
* author: zhanghaozhuang 
* @file es6 转 es5
*/
// Babel-cli => npm install -g babel-cli
// npm install --save-dev babel-preset-es2015 babel-cli
// babel src/index.js -o dist/index.js
// 使用方法 cd es6-babel-es5 npm install
var a = 1;

var promise = new Promise(function (reslove, reject) {
    console.log('Promise 立即执行');
    setTimeout(function () {
        console.log('settimeout最后执行' + 2);
    }, 0);
});
console.log(1);