'use strict';

/*
*  构造函数
*/

(function () {
    var test = function test() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zhanghaozhaung';

        this.satus = true;
        this.text = text;
        this.x = '';
    };

    test.prototype = {
        init: function init() {
            this.handle();
        },
        handle: function handle() {
            console.log(this.satus, this.text);
        }
    };
    return window.test = new test(); // return 必须放在方法中不然会报错
})();