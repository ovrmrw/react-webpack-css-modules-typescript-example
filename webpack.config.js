const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = function (env = {}) {
  console.log('env:', env)

  let context = process.cwd()
  let outputFilename
  let plugins = []
  let moduleRules = []

  ////////////////////////////////////// output.filename
  outputFilename = env.production ? 'static/js/bundle.[hash].js' : 'static/js/[name].js'

  ////////////////////////////////////// plugins
  plugins.push(
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    })
  )

  if (env.production) {
    // production
    plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$/
      }),
      new ExtractTextPlugin('static/css/bundle.[hash].css')
    )
  } else {
    // development
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills'],
      })
    )
  }

  ////////////////////////////////////// module.rules
  moduleRules.push(
    {
      test: /\.tsx?$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: env.production ?
              // production
              ['latest'] :
              // development
              [],
            plugins: [
              'transform-react-jsx',
              'react-css-modules',
            ]
          }
        },
        'awesome-typescript-loader'
      ]
    },
    {
      test: /\.css$/,
      use: env.production ?
        // production
        ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
              }
            },
            'postcss-loader',
          ]
        }) :
        // development
        ['style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            }
          },
          'postcss-loader',
        ]
    }
  )


  return {
    performance: false,
    entry: env.production ?
      // production
      ['./config/polyfills.ts', './src/index.ts'] :
      // development
      {
        main: './src/index.ts',
        vendor: './config/vendor.ts',
        polyfills: './config/polyfills.ts',
      }
    ,
    output: {
      filename: outputFilename,
      path: 'dist'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: moduleRules,
    },
    plugins,
    devtool: 'source-map',
  }

}
