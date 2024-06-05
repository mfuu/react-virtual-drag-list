import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');
const version = packageJson.version;
const homepage = packageJson.homepage;
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const banner = `
/*!
 * react-virtual-drag-list v${version}
 * open source under the MIT license
 * ${homepage}
 */
`;

export default [
  {
    external: ['react'],
    input: 'src/index.tsx',
    output: [
      {
        format: 'umd',
        file: 'dist/virtual-drag-list.js',
        name: 'VirtualList',
        sourcemap: false,
        globals: {
          react: 'React',
        },
        banner: banner.replace(/\n/, ''),
      },
      {
        format: 'umd',
        file: 'dist/virtual-drag-list.min.js',
        name: 'VirtualList',
        sourcemap: false,
        globals: {
          react: 'React',
        },
        banner: banner.replace(/\n/, ''),
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), typescript(), commonJs(), babel({ extensions })],
  },
  {
    input: 'src/index.tsx',
    output: {
      file: 'types/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];
