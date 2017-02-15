const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = function (env = {}) {
  console.log('env:', env)

  const isProduction = !!env.production
  const context = process.cwd()
  const cssModulesScopedName = '[path]___[name]__[local]___[hash:base64:5]'
  let entry
  let outputFilename
  let plugins = []
  let moduleRules = []

  ////////////////////////////////////// entry
  entry = isProduction ?
    // production
    ['./config/polyfills.ts', './src/index.ts'] :
    // development
    {
      main: './src/index.ts',
      vendor: './config/vendor.ts',
      polyfills: './config/polyfills.ts',
    }

  ////////////////////////////////////// output.filename
  outputFilename = isProduction ?
    // production
    'static/js/bundle.[chunkhash].js' :
    // development
    'static/js/[name].js'

  ////////////////////////////////////// plugins
  plugins.push(
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    })
  )

  if (isProduction) {
    // production
    plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$/
      }),
      new ExtractTextPlugin('static/css/bundle.[chunkhash].css')
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
            presets: isProduction ?
              // production
              ['latest'] :
              // development
              [],
            plugins: [
              'transform-react-jsx',
              ['react-css-modules', { generateScopedName: cssModulesScopedName }],
            ]
          }
        },
        'awesome-typescript-loader'
      ]
    },
    {
      test: /\.css$/,
      use: isProduction ?
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
                localIdentName: cssModulesScopedName,
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
              localIdentName: cssModulesScopedName,
            }
          },
          'postcss-loader',
        ]
    }
  )


  return {
    context,
    entry,
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
    performance: false,
  }

}
