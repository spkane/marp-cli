import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import pugPlugin from 'rollup-plugin-pug'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import { dependencies } from './package.json'

const external = [
  ...Object.keys(dependencies),
  'crypto',
  'fs',
  'path',
  'url',
  'chrome-launcher/dist/chrome-finder',
  'yargs/yargs',
]

const plugins = [
  json({ preferConst: true }),
  nodeResolve({ jsnext: true }),
  commonjs(),
  typescript({ resolveJsonModule: false }),
  postcss({
    inject: false,
    plugins: [autoprefixer(), cssnano({ preset: 'default' })],
  }),
  pugPlugin({ pugRuntime: 'pug-runtime' }),
  !process.env.ROLLUP_WATCH && terser(),
]

export default [
  {
    external,
    plugins,
    input: 'src/templates/bespoke.js',
    output: { file: 'lib/bespoke.js', format: 'iife' },
  },
  {
    external,
    plugins,
    input: 'src/templates/watch.js',
    output: { file: 'lib/watch.js', format: 'iife' },
  },
  {
    external,
    plugins,
    input: 'src/marp-cli.ts',
    output: { exports: 'named', file: 'lib/marp-cli.js', format: 'cjs' },
  },
]
