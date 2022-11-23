import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [{
  input: './index.mjs',
  output: {
    file: 'dist/eventemitter3.esm.js',
    format: 'es'
  },
  plugins: [commonjs()]
}, {
  input: './index.js',
  output: {
    format: 'umd',
    name: 'EventEmitter3',
    file: 'dist/eventemitter3.umd.js'
  },
  plugins: [commonjs()]
}, {
  input: './index.js',
  output: {
    compact: true,
    format: 'umd',
    name: 'EventEmitter3',
    file: 'dist/eventemitter3.umd.min.js'
  },
  plugins: [commonjs(), terser()]
}];
