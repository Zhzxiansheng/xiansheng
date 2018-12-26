/*
* author: zhanghaozhuang 
* @file es6 转 es5
*/
// Babel-cli => npm install -g babel-cli
// npm install --save-dev babel-preset-es2015 babel-cli
// babel src/index.js -o dist/index.js
// 使用方法 cd es6-babel-es5 npm install
let a = 1;

let promise = new Promise((reslove, reject) => {
    console.log('Promise 立即执行');
    setTimeout(() => {
        console.log('-------这里是promise settimeout 最后执行--------');
        console.log('settimeout最后执行' + 2);
    },0);
});
console.log(1);