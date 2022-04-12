import babel from 'rollup-plugin-babel'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
const packageJson = require('./package.json')
const version = packageJson.version
const homepage = packageJson.homepage

const banner = `
/*!
 * react-virtual-drag-list v${version}
 * open source under the MIT license
 * ${homepage}
 */
`

export default {
  external: ['react', 'js-draggable-list'],
  input: 'src/index.tsx',
  output: {
    format: 'umd',
    file: 'dist/draglist.js',
    name: 'virtualDragList',
    sourcemap: false,
    globals: {
      react: 'React',
      'js-draggable-list': 'Draggable'
    },
    banner: banner.replace(/\n/, '')
  },
  plugins: [
    typescript(),
    babel(),
    resolve(),
    commonJs()
  ]
}
