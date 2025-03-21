const path = require('path');
const babel = require('@babel/register');
const webpack = require('webpack');

const src = './src';
//const dest = './';
const dest = '';

const relativeSrcPath = path.relative('.', src);

module.exports = {
  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest,
    uglify: false
  },

  eslint: {
    src: [
      src + '/js/**',
      './test/**/*.js',
      '!' + src + '/js/third_party/*.js'
    ],
    opts: {
      useEslintrc: true
    }
  },

  webpack: {
    node: {
      target: 'node',
      mode: 'development',
      entry: src + '/js/main.js',
      output: {
        path: dest,
        filename: 'index.node.js',
        library: 'JSceneKit',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        extensions: ['.js']
      },
      plugins: [
        new webpack.DefinePlugin({'process.env.BROWSER': false})
      ],
      module: {
        rules: [
          {
            test: /ammo.js$/,
            loader: 'script-loader'
          },
          {
            test: /\.js$/,
            exclude: [/node_modules/, /ammo.js$/],
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      externals: {
        fs: 'fs'
        //'../third_party/ammo': 'ammo'
      }
    },
    web: {
      target: 'web',
      mode: 'development',
      entry: src + '/js/main.js',
      output: {
        path: dest,
        filename: 'index.web.js',
        library: 'JSceneKit',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        extensions: ['.js']
      },
      plugins: [
        new webpack.DefinePlugin({'process.env.BROWSER': true})
      ],
      module: {
        rules: [
          {
            test: /ammo.js$/,
            loader: 'script-loader'
          },
          {
            test: /\.js$/,
            exclude: [/node_modules/, /ammo.js$/],
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      node: {
        fs: false,
        Buffer: true
      },
      externals: {
        //fs: 'fs'
        //'../third_party/ammo': 'ammo'
      }
    },
    webmin: {
      target: 'web',
      mode: 'production',
      entry: src + '/js/main.js',
      output: {
        path: dest,
        filename: 'index.web.min.js',
        library: 'JSceneKit',
        libraryTarget: 'var'
      },
      resolve: {
        extensions: ['.js']
      },
      plugins: [
        new webpack.DefinePlugin({'process.env.BROWSER': true})
      ],
      module: {
        rules: [
          {
            test: /ammo.js$/,
            loader: 'script-loader'
          },
          {
            test: /\.js$/,
            exclude: [/node_modules/, /ammo.js$/],
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      node: {
        fs: false,
        Buffer: true
      },
      externals: {
        //fs: 'fs'
        //'../third_party/ammo': 'ammo'
      }
    }
  },

  mocha: {
    src: ['test/**/*.js', 'src/**/*.js', '!src/**/*.web.js'],
    compilers: {
      js: babel
    },
    opts: {
      ui: 'bdd',
      reporter: 'spec', // or nyan
      globals: [],
      require: ['test/helper/testHelper', 'chai']
    }
  },

  copy: {
    src: [
    ],
    dest: dest
  },

  watch: {
    js: relativeSrcPath + '/js/**'
  }
}

