import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace'
import { uglify } from "rollup-plugin-uglify";

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'RollupStarter';

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({
      extensions,
      mainFields: ['jsnext', 'preferBuiltins', 'browser'],
    }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),

    replace({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),

    process.env.NODE_ENV === 'production' && uglify(),
  ],

  output: [{
    // for both browser and node.js
    file: 'dist/index.js',
    format: 'umd',
    name,
  }],
};
