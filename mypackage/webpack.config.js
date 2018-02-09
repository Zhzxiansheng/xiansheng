var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require("clean-webpack-plugin")
// const c = require('./less-plugins')
    // const proxy = require('http-proxy-middleware');
var WebpackDevServer = require('webpack-dev-server');

//const LessPluginFunctions = require('less-plugin-functions')
//const postcssSprites = require('postcss-sprites');
module.exports = {
    // 配置页面入口js文件
    entry: {
        // vendor: './src/vendor.js',
        list: './src/list.js'

    },
    devtool: "cheap-module-eval-source-map",
    // 配置打包输出相关
    output: {
        // 打包输出目录 “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
        path: path.resolve(__dirname, 'dist'),
        //        path.join([path1][, path2][, ...])
        // 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是/，Windows系统是\。
        // path.resolve([from ...], to)
        // 将 to 参数解析为绝对路径。
        //path: __dirname + '/dist/',

        // 入口js的打包输出文件名
        filename: '[name].js'
    },

    module: {
        /*
        配置各种类型文件的加载器, 称之为loader
        webpack当遇到import ... 时, 会调用这里配置的loader对引用的文件进行编译
        */
        rules: [{
                /*
                使用babel编译ES6/ES7/ES8为ES5代码
                使用正则表达式匹配后缀名为.js的文件
                */
                test: /\.js$/,

                // 排除node_modules目录下的文件, npm安装的包不需要编译
                exclude: /node_modules/,

                /*
                use指定该文件的loader, 值可以是字符串或者数组.
                这里先使用eslint-loader处理, 返回的结果交给babel-loader处理. loader的处理顺序是从最后一个到第一个.
                eslint-loader用来检查代码, 如果有错误, 编译的时候会报错.
                babel-loader用来编译js文件.
                */
                use: [{
                        loader: 'babel-loader',
                         options: { presets: ['es2015'] }


                    }
                     , { loader: 'eslint-loader' }
                ]

            },

            {
                // 匹配.html文件
                test: /\.html$/,
                /*
                使用html-loader, 将html内容存为js字符串, 比如当遇到
                import htmlString from './template.html';
                template.html的文件内容会被转成一个js字符串, 合并到js文件里.
                */
                use: ['html-loader']
            },

            {
                // 匹配.css文件
                test: /\.css$/,

                /*
                先使用css-loader处理, 返回的结果交给style-loader处理.
                css-loader将css内容存为js字符串, 并且会把background, @font-face等引用的图片,
                字体文件交给指定的loader打包, 类似上面的html-loader, 用什么loader同样在loaders对象中定义, 等会下面就会看到.
                */
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }
                        // ,{ loader: 'postcss-loader' }
                    ]
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                           minimize: true
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: [require('autoprefixer')],
                    //         sourceMap: true
                    //     }
                    // },
                    // {
                    //     loader: 'less-loader',
                    //     options: {
                    //         plugins: require('./less-plugins'),
                    //         sourceMap: true
                    //     }
                    // }
                  ]
                })
            },

            {
                /*
                匹配各种格式的图片和字体文件
                上面html-loader会把html中<img>标签的图片解析出来, 文件名匹配到这里的test的正则表达式,
                css-loader引用的图片和字体同样会匹配到这里的test条件
                */
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,

                /*
                使用url-loader, 它接受一个limit参数, 单位为字节(byte)

                当文件体积小于limit时, url-loader把文件转为Data URI的格式内联到引用的地方
                当文件大于limit时, url-loader会调用file-loader, 把文件储存到输出目录, 并把引用的文件路径改写成输出后的路径

                比如 views/foo/index.html中
                <img src="smallpic.png">
                会被编译成
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">

                而
                <img src="largepic.png">
                会被编译成
                <img src="/f78661bef717cf2cc2c2e5158f196384.png">
                */
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000000,
                        name: '/images/[name].[ext]'
                    }
                }]
            }
        ]
    },

    /*
    配置webpack插件
    plugin和loader的区别是, loader是在import时根据不同的文件名, 匹配不同的loader对这个文件做处理,
    而plugin, 关注的不是文件的格式, 而是在编译的各个阶段, 会触发不同的事件, 让你可以干预每个编译阶段.
    */
    plugins: [
        /*
        html-webpack-plugin用来打包入口html文件
        entry配置的入口是js文件, webpack以js文件为入口, 遇到import, 用配置的loader加载引入文件
        但作为浏览器打开的入口html, 是引用入口js的文件, 它在整个编译过程的外面,
        所以, 我们需要html-webpack-plugin来打包作为入口的html文件
        */
        /*
            template参数指定入口html文件路径, 插件会把这个文件交给webpack去编译,
            webpack按照正常流程, 找到loaders中test条件匹配的loader来编译, 那么这里html-loader就是匹配的loader
            html-loader编译后产生的字符串, 会由html-webpack-plugin储存为html文件到输出目录, 默认文件名为index.html
            可以通过filename参数指定输出的文件名
            html-webpack-plugin也可以不指定template参数, 它会使用默认的html模板.
            */
        new HtmlWebpackPlugin({

            template: './src/index.html',
            chunks: ['vendor', 'list'], //如果有关于文件的排序 可在下方更改，没有的话请忽略
            chunksSortMode: function(chunk1, chunk2) {
                var order = ['vendor', 'list'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        //new HtmlWebpackPlugin(),
        new ExtractTextPlugin('list.css'),
        new webpack.optimize.UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        })


    ],

    /*
    配置开发时用的服务器, 让你可以用 http://127.0.0.1:8080/ 这样的url打开页面来调试
    并且带有热更新的功能, 打代码时保存一下文件, 浏览器会自动刷新. 比nginx方便很多
    如果是修改css, 甚至不需要刷新页面, 直接生效. 这让像弹框这种需要点击交互后才会出来的东西调试起来方便很多.
    */
    devServer: {
        // 配置监听端口, 因为8080很常用, 为了避免和其他程序冲突, 我们配个其他的端口号

        port: 8080,
        proxy: {
            "*": {
                target: "http://localhost",
                //pathRewrite: { "^/api": "" },
                changeOrigin: true
            }
        },

        disableHostCheck: true,

        historyApiFallback: true,

    }
}
