// @file config.js
var webpack = require('webpack');
var path = require('path');

var dest = './public'; 
var src = './src'; 
var relativeSrcPath = path.relative('.', src);
var current = process.cwd();

module.exports = {
  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest + '/js',
    uglify: false
  },
  
  webpack: {
    entry: src + '/js/main.js',
    output: {
      filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    resolve: {
      root: [
        path.join(current, 'bower_components'),
        current
      ]
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
      ),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
      })
    ],
    module: {
      loaders: [
        {test: /\.hbs$/, loader: "handlebars-loader"}
      ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }    
  },
  copy: {
    src: [
      src + '/src/images/*'
    ],
    dest: dest
  },
  less: {
    src: [  // load third party less if needed
      src + '/less/style.less'
    ],
    dest: dest + '/css/',
    output: 'style.css',
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  },
  
  watch: {
    js: relativeSrcPath + '/js/**',
    less: relativeSrcPath + '/less/**',
    www: relativeSrcPath + '/www/index.html'
  }  
}