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
  input: './index.mjs',
  output: {
    compact: true,
    file: 'dist/eventemitter3.esm.min.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [commonjs(), terser()]
}, {
  input: './index.js',
  output: {
    file: 'dist/eventemitter3.umd.js',
    format: 'umd',
    name: 'EventEmitter3'
  },
  plugins: [commonjs()]
}, {
  input: './index.js',
  output: {
    compact: true,
    file: 'dist/eventemitter3.umd.min.js',
    format: 'umd',
    name: 'EventEmitter3',
    sourcemap: true
  },
  plugins: [commonjs(), terser()]
}];
