export default (function () {
'use strict';

// 计算平台环境并导出
var platform = '';
!function () {
    var userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('WUBA') != -1) {
        platform = 'app';
    } else if (userAgent.indexOf('MicroMessenger') != -1) {
        platform = 'wx';
    } else {
        if (document.cookie.indexOf('58ua') != -1) {
            platform = 'app';
        } else {
            platform = 'm';
        }
    }
}();

var env = Object.freeze({
	get platform () { return platform; }
});

/**
 * 动态添加js,请求回来之后在回调函数里面执行你的操作
 * @param {string} url js地址.
 * @param {function} callback 加载完毕的回调函数.
 */
var loadjs = function (url, callback) {
    /**
    * onload回调
    */
    function onload() {
        var readyState = script.readyState;
        if (typeof readyState == 'undefined' || /^(loaded|complete)$/.test(readyState)) {
            script.onload = script.onreadystatechange = null;
            script = null;
            callback && callback();
        }
    }
    var script = document.createElement('script');
    script.async = true;
    if (script.readyState) {
        script.onreadystatechange = onload;
    } else {
        script.onload = onload;
    }
    script.src = url;
    var parent = document.getElementsByTagName('head')[0] || document.body;
    parent.appendChild(script) && (parent = null);
};

/**
 * 用cookie名获取值
 * @param {string} cname cookie name.
 * @return {string} cookie value.
 */
function get(cname) {
    var name = cname + '=';
    var decodedCookie = void 0;
    try {
        decodedCookie = decodeURIComponent(document.cookie);
    } catch (err) {
        decodedCookie = document.cookie;
    }
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * 设置cookie名值以及过期时间
 * @param {string} cname cookie name.
 * @param {string} cvalue cookie value.
 * @param {string} exdays cookie expires (day).
 */
function set(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/**
 * 删除cookie
 * @param {string} name cookie name.
 */
function remove(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

var cookie = Object.freeze({
	get: get,
	set: set,
	remove: remove
});



var tools = Object.freeze({
	env: env,
	cookie: cookie,
	loadjs: loadjs
});

/**
 * 对方法进行过滤，只返回需要的方法，没有的补空
 * @param {object} funLib 对应环境的原始方法对象.
 * @param {array} funArr 需要提取的方法名数组.
 * @return {object} 返回需要提取的方法，填补空方法.
 */
var funcFilter = function funcFilter(funLib, funArr) {
    var result = {};
    funArr.forEach(function (element, index, array) {
        result[element] = funLib[element] ? funLib[element] : function () {};
    });
    return result;
};

/**
 * 判断登录状态
 * @param {function} callback login callback.
 */
function isLogin(callback) {
    window.isLoginCallback = callback;
    WBAPP.isLogin('isLoginCallback');
}

/**
 * 调用登录
 * @param {string} url url is just a placeholder.
 * @param {function} callback login callback.
 */
function login(url) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    window.openMobileLoginCallback = callback;
    window.isLoginCallback = function (data) {
        if (data['state']) {
            // app端已经登录了
            return;
        }
        WBAPP.openMobileLogin('openMobileLoginCallback');
    };
    WBAPP.isLogin('isLoginCallback');
}

/**
 * 调用登出
 * @param {string} url url is just a placeholder.
 * @param {function} callback logout callback.
 */
function logout(url, callback) {
    window.logoutCallback = callback;
    window.isLoginCallback = function (data) {
        if (!data['state']) {
            // app端已经登录了
            return;
        }
        WBAPP.logout('', 'logoutCallback');
    };
    WBAPP.isLogin('isLoginCallback');
}

var appFunctions = Object.freeze({
	isLogin: isLogin,
	login: login,
	logout: logout
});

/**
 * 判断登录状态
 * @param {function} callback login callback.
 */
function isLogin$1(callback) {
    if (FBridge.cookie.get('PPU')) {
        callback({ state: true });
    } else {
        callback({ state: false });
    }
}

/**
 * 调用登录
 * @param {string} url 登录成功之后的跳转地址.
 */
function login$1(url) {
    window.location.href = encodeURI('//m.m.58.com/login?path=' + url);
}

/**
 * 调用登出
 * @param {string} url 登出成功之后的跳转地址.
 */
function logout$1(url) {
    window.location.href = '//passport.58.com/logout?path=' + url;
}

var mFunctions = Object.freeze({
	isLogin: isLogin$1,
	login: login$1,
	logout: logout$1
});

var funLib = { app: appFunctions, m: mFunctions, wx: mFunctions };
var funArr = ['isLogin', 'login', 'logout'];

var index = funcFilter(funLib[platform], funArr);

/**
 * 发送埋点
 * @param {string} logMsg 埋点内容.
 * @param {string} pageType pageType.
 * @param {string} cate 选填项，埋点统计页面分类 fullPath.
 * @param {array} params 选填项，埋点参数.
 * @param {string} area 选填项，区域信息.
 */
function send() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      logMsg = _ref.logMsg,
      _ref$pageType = _ref.pageType,
      pageType = _ref$pageType === undefined ? 'click' : _ref$pageType,
      _ref$cate = _ref.cate,
      cate = _ref$cate === undefined ? '1' : _ref$cate,
      params = _ref.params,
      area = _ref.area,
      _ref$appPrefix = _ref.appPrefix,
      appPrefix = _ref$appPrefix === undefined ? 'app_' : _ref$appPrefix;

  WBAPP.setWebLog(appPrefix + logMsg, pageType, cate, params, area);
}

/**
 * 发送展现埋点，有待优化
 * @param {string} appPageType appPageType.
 * @param {string} mPageType mPageType.
 * @param {string} wxPageType wxPageType.
 * @param {string} cate cate码.
 * @param {string} actionType 埋点内容.
 */
function show(appPageType, mPageType, wxPageType) {
  var cate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';
  var actionType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'show';

  WBAPP.setWebLog(actionType, appPageType, cate);
}

var appFunctions$1 = Object.freeze({
	send: send,
	show: show
});

/**
 * 发送埋点
 * @param {string} logMsg 埋点内容.
 */
function send$1() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        logMsg = _ref.logMsg,
        _ref$mPrefix = _ref.mPrefix,
        mPrefix = _ref$mPrefix === undefined ? 'm_' : _ref$mPrefix;

    window.clickLog('from=' + mPrefix + logMsg);
}
/**
 * 发送展现埋点，有待优化
 * @param {string} appPageType appPageType.
 * @param {string} mPageType mPageType.
 * @param {string} wxPageType wxPageType.
 * @param {string} cate cate码.
 * @param {string} actionType 埋点内容.
 */
function show$1(appPageType, mPageType, wxPageType) {
    var cate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';
    var actionType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'show';

    window.clickLog('from=' + mPageType);
}

var mFunctions$1 = Object.freeze({
	send: send$1,
	show: show$1
});

/**
 * 发送埋点
 * @param {string} logMsg 埋点内容.
 */
function send$2() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        logMsg = _ref.logMsg,
        _ref$wxPrefix = _ref.wxPrefix,
        wxPrefix = _ref$wxPrefix === undefined ? 'wx_' : _ref$wxPrefix;

    window.clickLog('from=' + wxPrefix + logMsg);
}
/**
 * 发送展现埋点，有待优化
 * @param {string} appPageType appPageType.
 * @param {string} mPageType mPageType.
 * @param {string} wxPageType wxPageType.
 * @param {string} cate cate码.
 * @param {string} actionType 埋点内容.
 */
function show$2(appPageType, mPageType, wxPageType) {
    var cate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';
    var actionType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'show';

    window.clickLog('from=' + wxPageType);
}

var wxFunctions = Object.freeze({
	send: send$2,
	show: show$2
});

var funLib$1 = { app: appFunctions$1, m: mFunctions$1, wx: wxFunctions };
var funArr$1 = ['send', 'show'];

var index$1 = funcFilter(funLib$1[platform], funArr$1);

/**
 * app分享
 * @param {string} title 标题.
 * @param {string} content 分享描述.
 * @param {string} url 分享url.
 * @param {string} imgUrl 分享图标url.
 * @param {string} shareto 分享到的地方.
 * @param {function} callback 分享后的回调.
 */
function config() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        title = _ref.title,
        content = _ref.content,
        _ref$url = _ref.url,
        url = _ref$url === undefined ? window.location.href : _ref$url,
        _ref$imgUrl = _ref.imgUrl,
        imgUrl = _ref$imgUrl === undefined ? 'https://img.58cdn.com.cn/fangrs/img/7fbe9179b04d2ffd9a660361aaa50af1.png' : _ref$imgUrl,
        _ref$shareto = _ref.shareto,
        shareto = _ref$shareto === undefined ? 'QQ,SINA,WEIXIN,FRIENDS,COPY | ALL' : _ref$shareto,
        _ref$callback = _ref.callback,
        callback = _ref$callback === undefined ? function () {} : _ref$callback;

    window.rightBtnCallback = function () {
        WBAPP.shareInfo(title, url, imgUrl, '分享占位显示', content, shareto, '', '', '', callback);
    };
    WBAPP.extendRightBtn('top_right', '分享', 'rightBtnCallback');
}

var appFunctions$2 = Object.freeze({
	config: config
});

/**
 * 微信分享
 * @param {string} title 标题.
 * @param {string} content 分享描述.
 * @param {string} url 分享url.
 * @param {string} imgUrl 分享图标url.
 * @param {string} shareto 分享到的地方.
 * @param {function} callback 分享后的回调.
 */
function config$1() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        title = _ref.title,
        content = _ref.content,
        _ref$url = _ref.url,
        url = _ref$url === undefined ? window.location.href : _ref$url,
        _ref$imgUrl = _ref.imgUrl,
        imgUrl = _ref$imgUrl === undefined ? 'https://img.58cdn.com.cn/fangrs/img/7fbe9179b04d2ffd9a660361aaa50af1.png' : _ref$imgUrl,
        _ref$shareto = _ref.shareto,
        shareto = _ref$shareto === undefined ? 'QQ,SINA,WEIXIN,FRIENDS,TENCENT,QQSPACE' : _ref$shareto,
        _ref$callback = _ref.callback,
        callback = _ref$callback === undefined ? function () {} : _ref$callback;

    wx.ready(function () {
        var platform = shareto.split(',');
        if (platform.includes('FRIENDS')) {
            wx.onMenuShareTimeline({
                title: title,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'FRIENDS');
                },
                cancel: function cancel() {
                    callback('2', 'FRIENDS');
                }
            });
        }

        if (platform.includes('WEIXIN')) {
            wx.onMenuShareAppMessage({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'WEIXIN');
                },
                cancel: function cancel() {
                    callback('2', 'WEIXIN');
                }
            });
        }

        if (platform.includes('QQ')) {
            wx.onMenuShareQQ({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'QQ');
                },
                cancel: function cancel() {
                    callback('2', 'QQ');
                }
            });
        }

        if (platform.includes('TENCENT')) {
            wx.onMenuShareWeibo({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'TENCENT');
                },
                cancel: function cancel() {
                    callback('2', 'TENCENT');
                }
            });
        }

        if (platform.includes('QQSPACE')) {
            wx.onMenuShareQQ({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'QQSPACE');
                },
                cancel: function cancel() {
                    callback('2', 'QQSPACE');
                }
            });
        }
    });
    wx.error(function (res) {
        throw new Error('wx cinfig error:' + res);
    });
}

var wxFunctions$1 = Object.freeze({
	config: config$1
});

/**
 * 防止报错
 */
function config$2() {}

var mFunctions$2 = Object.freeze({
	config: config$2
});

var funLib$2 = { app: appFunctions$2, m: mFunctions$2, wx: wxFunctions$1 };
var funArr$2 = ['config'];

var index$2 = funcFilter(funLib$2[platform], funArr$2);

/**
 * app 页面跳转
 * @param {string} href 跳转url.
 * @param {string} pageTitle pageTitle.
 * @param {object | string} nativeParameter 跳转native页面所需参数.
 */
function redirect(href, pageTitle, nativeParameter) {
    if (nativeParameter) {
        if (typeof nativeParameter == 'string') {
            nativeParameter = JSON.parse(nativeParameter);
        }
        WBAPP._nativeBridge(nativeParameter);
        return;
    }
    WBAPP.loadPage('link', href, pageTitle);
}

var appFunctions$3 = Object.freeze({
	redirect: redirect
});

/**
 * 页面跳转
 * @param {string} href 跳转url.
 */
function redirect$1(href) {
  window.location.href = href;
}

var mFunctions$3 = Object.freeze({
	redirect: redirect$1
});

var funLib$3 = { app: appFunctions$3, m: mFunctions$3, wx: mFunctions$3 };
var funArr$3 = ['redirect'];

var index$3 = funcFilter(funLib$3[platform], funArr$3);



var components = Object.freeze({
	passport: index,
	track: index$1,
	share: index$2,
	router: index$3
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var FBridge$1 = {};
_extends(FBridge$1, components, tools);
// 检测微信外部依赖项
    if (platform == 'wx') {
        if (!window.wx) {
            document.write('<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');
            document.write('<script src="//weixin.58.com/weixinjsconfig/config?t=' + Math.random() + '&debug=false"></script>');
        }
    }
if (platform != 'app') {
    if (!window.clickLog) {
        document.write('<script src="//j2.58cdn.com.cn/olympia/js/lib/esl_zepto_load.min.js"></script>');
        document.write('<script type="text/javascript" src="//tracklog.58.com/referrer_m.js" async=""></script>');
    }
} else {
    if (!window.WBAPP) {
        document.write('<script type="text/javascript" src="//a.58cdn.com.cn/app58/static/rms/app/js/app_20264.js"></script>');
    }
}



return FBridge$1;

}());
