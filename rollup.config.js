import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import path from 'path'
import {minify} from 'uglify-es'


const pkg = require('./package.json')

const basePlugins = [
  resolve({
    jsnext: true,
    esnext: true,
    'jsnext:main': true,
    main: true,
    preferBuiltins: true,
    browser: true
  }),
  cjs({exclude: [path.join(__dirname, './src/**/*'), path.join(__dirname, './node_modules/@babel/runtime/core-js/array/from.js')]}),
  babel({
    // exclude: [path.join(__dirname, './node_modules/**/*')],
    presets: [
      ['@babel/env', {modules: false}],
      '@babel/stage-2',
      '@babel/react'
    ],
    plugins: [
      'transform-react-pure-components',
      '@babel/transform-react-constant-elements',
      '@babel/proposal-do-expressions',
      '@babel/proposal-export-default-from',
      '@babel/proposal-nullish-coalescing-operator',
      '@babel/proposal-optional-chaining',
      '@babel/proposal-pipeline-operator',
      'transform-react-remove-prop-types',
      'closure-elimination',
      'polished'
    ],
    babelrc: false
  }),
]

const baseConfig = {input: './src/index.js', exports: 'named'}
const baseExternal = ['react', 'react-dom', 'react-router-dom', 'prop-types', 'preact']

//const mainConfig = Object.assign({}, baseConfig, {
//  plugins: basePlugins,
//  output: [
//    { file: pkg.main, format: 'cjs' },
//    { file: pkg.module, format: 'es' }
//  ]
//})

const umdConfig = Object.assign({}, baseConfig, {
  plugins: basePlugins.concat(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify(
      {
        compress: {
          passes: 3,
          keep_infinity: true,
          drop_console: true,
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          unsafe_Func: true,
          unsafe_math: true,
          unsafe_regexp: true,
          warnings: false,
          dead_code: true
        }
      },
      minify
    )
  ),
  output: {
    file: './dist/curls.js',
    format: 'umd',
    name: 'Curls',
    globals: {react: 'React', 'react-dom': 'ReactDOM', 'react-router-dom': 'Router', 'prop-types': 'PropTypes', preact: 'preact'},
  },
  external: baseExternal,
})


// export default [mainConfig, umdConfig]
export default umdConfig
