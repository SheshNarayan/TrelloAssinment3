const path = require('path');
var webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode:"development",
    // entry:"./main.js",
    entry:"./js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude:"/node_modules/",
                use: "babel-loader"
            },
            
            {
                test: /\.css$/, 
                exclude: "/node_modules/",
                use: [
                        { loader: "style-loader" },
                        { loader:"css-loader" }
                       
                    ]
            }
        ]
    },

    plugins:[
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            'global.jQuery': 'jquery'
        }),
        new htmlWebpackPlugin({template: './index.html'})
    ],
    watch: true

    // devServer: {
    //     // contentBase: path.join(__dirname, 'dist'),
    //     contentBase: path.resolve(__dirname, 'dist'),
    //     compress: true,
    //     port: 9000
    // }
}   