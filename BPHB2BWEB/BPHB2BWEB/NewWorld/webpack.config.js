const path = require('path');
// 提取 / 压缩 HTML插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 提取CSS插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩CSS插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 跳过 打包 / 压缩
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    // 入口文件
    entry: {
        home                : './src/views/home/home.js',                           // 1  首页入口路径 
        Category            : './src/views/Category/Category.js',                   // 2  商品分类页 
        particulars         : './src/views/particulars/particulars.js',             // 3  商品详情页
        denglu              : './src/views/denglu/denglu.js',                       // 4  登录页
        zhuce               : './src/views/zhuce/zhuce.js',                         // 5  注册页
        shopping            : './src/views/shopping/shopping.js',                   // 6  购物车
        goodsOrder          : './src/views/goodsOrder/goodsOrder.js',               // 7  订单页
        payment             : './src/views/payment/payment.js',                     // 8  支付页
        order               : './src/views/order/order.js',                         // 9  订单管理
        'shipping-address'  : './src/views/shipping-address/shipping-address.js',   // 10 收货地址
        orderDetails        : './src/views/orderDetails/orderDetails.js',           // 11 查看订单
        dBusiness           : './src/views/dBusiness/dBusiness.js',                 // 13 商家中心
        'd-manage'          : './src/views/d-manage/d-manage.js'                    // 14 上架商品管理
    },  
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),  //dist          生成的文件夹
        filename: './views/[name]/[name].js'    //bundle.js     打包到这个文本
    },
    // 本地服务器配置
    devServer: {
        // 本地服务路径
        contentBase:"./dist",
        // 实时刷新
        inline:true
    },
    // 配置加载loader
    module:{
        //
        rules: [
            // CSS
            {
                test:/\.css/,
                use:[MiniCssExtractPlugin.loader,"css-loader",{
                  loader: "postcss-loader",
                  options: {
                        plugins: () => [require('autoprefixer')]
                    }
                }]
            },
            // ES6 转 ES5
            {
                test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: "babel-loader"
             },
            //图片
            {
                //图片配置文件
                test: /\.(jpg|png|jpeg)$/,
                use: [
                    { loader: 'file-loader', options: {
                        name: '../../assets/image/bjimg/[name].[ext]',
                    } }
                ]
            },
        ]
    },
    // 提取 / 压缩
    plugins: [
// ====================================== 跳过 压缩/打包  ====================================================================
        new CopyWebpackPlugin([
            {
            from:'./src/assets',
            to:'./assets'
            }
        ]),
        new CopyWebpackPlugin([
            {
            from:'./src/public',
            to:'./public'
            }
        ]),
        new CopyWebpackPlugin([
            {
            from:'./src/views/payment/default.aspx.cs',
            to:'./views/payment/'
            }
        ]),
        new CopyWebpackPlugin([
            {
            from:'./src/views/payment/payment.aspx',
            to:'./views/payment/'
            }
        ]),
        new CopyWebpackPlugin([
            {
            from:'./src/views/payment/default.aspx',
            to:'./views/payment/'
            }
        ]),
        new CopyWebpackPlugin([
            {
            from:'./src/views/payment/payment.aspx.cs',
            to:'./views/payment/'
            }
        ]),
        new CopyWebpackPlugin([
            {
              from:'./src/views/dBusiness/FileSaver.js',
              to:'./views/dBusiness/'
            }
        ]),
        new CopyWebpackPlugin([
            {
              from:'./src/views/dBusiness/tableExport.js',
              to:'./views/dBusiness/'
            }
        ]),
// ====================================== 提取 CSS  ====================================================================
        new  MiniCssExtractPlugin({
            template:"./src/views/[name]/[name].css",
            filename: './views/[name]/[name].css',
            box : ' [name] .css ',
            chunkFilename : ' [id] .css ',
        }),
// ====================================== 压缩 CSS  ====================================================================
        new OptimizeCssAssetsPlugin(),
// ====================================== 提取 html  ====================================================================
        // 打包   home               首页
        new HtmlWebpackPlugin({
            // 显示html内容
            template:"./src/views/home/home.html",
            filename: './views/home/home.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   Category          商品分类页 
        new HtmlWebpackPlugin({
            template:"./src/views/Category/Category.html",
            filename: './views/Category/Category.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   particulars       商品详情页 
        new HtmlWebpackPlugin({
                template:"./src/views/particulars/particulars.html",
                filename: './views/particulars/particulars.html',
                inject:false,
                minify: {
                    // 去除多余引号
                    removeAttributeQuotes : true,
                    // 去除注释
                    removeComments : true,
                    // 去除空属性
                    removeEmptyAttributes : true,
                    // 去除空格
                    collapseWhitespace : true
                }
        }),
        // 打包   denglu            登录 
        new HtmlWebpackPlugin({
            template:"./src/views/denglu/denglu.html",
            filename: './views/denglu/denglu.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   zhuce             注册
        new HtmlWebpackPlugin({
            template:"./src/views/zhuce/zhuce.html",
            filename: './views/zhuce/zhuce.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   shopping          购物车
        new HtmlWebpackPlugin({
            template:"./src/views/shopping/shopping.html",
            filename: './views/shopping/shopping.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   goodsOrder        订单页
        new HtmlWebpackPlugin({
            template:"./src/views/goodsOrder/goodsOrder.html",
            filename: './views/goodsOrder/goodsOrder.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   payment           支付页
        new HtmlWebpackPlugin({
            template:"./src/views/payment/payment.html",
            filename: './views/payment/payment.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   order            订单管理
        new HtmlWebpackPlugin({
            template:"./src/views/order/order.html",
            filename: './views/order/order.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   shipping-address 收货地址
        new HtmlWebpackPlugin({
            template:"./src/views/shipping-address/shipping-address.html",
            filename: './views/shipping-address/shipping-address.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   orderDetails     查看订单
        new HtmlWebpackPlugin({
            template:"./src/views/orderDetails/orderDetails.html",
            filename: './views/orderDetails/orderDetails.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   searchPage       搜索页
        new HtmlWebpackPlugin({
            template:"./src/views/searchPage/searchPage.html",
            filename: './views/searchPage/searchPage.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   dBusiness       商家中心
        new HtmlWebpackPlugin({
            template:"./src/views/dBusiness/dBusiness.html",
            filename: './views/dBusiness/dBusiness.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
        // 打包   d-manage       商家中心
        new HtmlWebpackPlugin({
            template:"./src/views/d-manage/d-manage.html",
            filename: './views/d-manage/d-manage.html',
            inject:false,
            minify: {
                // 去除多余引号
                removeAttributeQuotes : true,
                // 去除注释
                removeComments : true,
                // 去除空属性
                removeEmptyAttributes : true,
                // 去除空格
                collapseWhitespace : true
            }
        }),
    ]
};