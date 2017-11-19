const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BASE_CONVENTION = '[name]-[chunkhash:8]'
const FILE_CONVENTION = `${BASE_CONVENTION}.[ext]`
const JS_CONVENTION = `${BASE_CONVENTION}.js`
const CSS_CONVENTION = `[name]-[contenthash:8].css`
const ENV = process.env.NODE_ENV
const IS_PRODUCTION = ENV === 'production'
const IS_TEST = ENV === 'test'

const USE_SOURCE_MAP = !IS_PRODUCTION

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    sourceMaps: !IS_PRODUCTION,
    minimize: IS_PRODUCTION
  }
}

const extraction = () => {
  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    name: CSS_CONVENTION,
    use: [
      cssLoader,
      'postcss-loader'
    ]
  })
}

const fileLoader = {
  use: [
    {
      loader: 'file-loader',
      options: {
        name: FILE_CONVENTION
      }
    }
  ]
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true
  }
}

const resolveLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: USE_SOURCE_MAP
  }
}

const webpackConf = {
  entry: {
    main: path.resolve(__dirname, 'src', 'main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: JS_CONVENTION,
    publicPath: '/dist/',
    jsonpFunction: 'webpackJsonp'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: !IS_PRODUCTION ? 'source-map' : false,
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: true,
    noInfo: true
    // Fill in if using the web-dev-server
  },
  plugins: [
    new ManifestPlugin({
      writeToFileEmit: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'manifest'], // Will include things only if they are not in main.js with this name
      minChunks: Infinity
    }),
    new ExtractTextPlugin(CSS_CONVENTION),
    new WebpackChunkHash(),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin('./dist/**/*.*')
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env'],
            sourceMap: USE_SOURCE_MAP
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)/,
        use: [
          extraction,
          sassLoader,
          resolveLoader,
          {loader: 'sass-loader?sourceMap'}
        ]
      },
      {
        test: /\.css/,
        use: [extraction]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        ...fileLoader
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        ...fileLoader
      },
      {
        test: /(htm|html|xhtml|hbs|handlebars|php|ejs)$/,
        loader: 'htmllint-loader',
        exclude: /(node_modules|vendor)/,
        query: {
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  }
}

if (IS_PRODUCTION) {
  webpackConf.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
  webpackConf.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  )
}

// Remove the commonsChunkPlugin as it interferes with Karma.
// @see https://github.com/webpack-contrib/karma-webpack/issues/24#issuecomment-257613167
if (IS_TEST) {
  const commonsChunkPluginIndex = webpackConf.plugins.findIndex(plugin => plugin.chunkNames)
  webpackConf.plugins.splice(commonsChunkPluginIndex, 1)
  const cleanPluginIndex = webpackConf.plugins.findIndex(plugin => plugin.paths)
  webpackConf.plugins.splice(cleanPluginIndex, 1)
}

module.exports = webpackConf
