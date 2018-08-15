 
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const babiliWebpackPlugin = require('babili-webpack-plugin');
module.exports = {
    devtool: 'evel-source-map',
    context: path.resolve(__dirname + '/http'),
    entry: {
        app: './app.js',
        vendor: ['jquery','bootstrap'],         
        angular: ['angular', 'angular-ui-router']
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'js/[name].bundle.js',
//      publicPath: '/meetroom/admin/', //用 npm test 时打开  
        publicPath:''//用npm start 时打开
    },
    devServer: {
        contentBase: [path.join(__dirname, "")],
        publicPath:'/',
        // Minimize output infomation
        stats      : 'minimal',
        // Server port
        
        port: 7070,
        host:'192.168.118.64',//'192.168.66.32',192.168.66.56
//      host:'https://futian-test.yuanqu.cc',//'192.168.66.32',192.168.66.56
        proxy:[
            {
         
                context:['/'],
                target: 'http://192.168.91.103:8080/',
//              target: 'https://futian-test.yuanqu.cc/',
            changeOrigin:true,
            secure:false
          }]
    },
  
    module: {
       
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015']}},
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader?jQuery!expose-loader?$'
            },
            {
                test: /\.view.html$/,
                use: [
                    {
                        loader: 'ngtemplate-loader'
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })
                // use: [{
                //     loader: 'style-loader'
                // }, {
                //     loader: 'css-loader'
                // }]
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.(jpg|png|gif)(\?.*$|$)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: './images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                //  loader: 'file-loader?publicPath=./&outputPath=font/' //本地运行有问题，换成下面的配置
                   use: [{
                       loader: 'file-loader',
                       options: {
                           name: './fonts/[name].[ext]'
                       }
                   }]
            }
        ]
    },
   
    plugins: [
        // new babiliWebpackPlugin({mangle:false}),
        // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new HtmlWebpackPlugin({
            template: __dirname + '/http/templates/index.tmpl.html',
            chunksSortMode: function (chunk1, chunk2) {
                var order = ['angular', 'vendor', 'app'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'angular'],
            filename: 'js/[name].bundle.js'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',           
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        }) 
    ],
    resolve:{
        extensions:['.js'],
        alias:{
            'ui': __dirname + '/http/libs/js',
            'datatable':__dirname+'/http/libs/jquery/datatables/media/js'
            
        }
    }
};