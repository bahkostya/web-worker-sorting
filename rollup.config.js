import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
    },
    plugins: [serve(), livereload()],
  },
  {
    input: 'src/worker.js',
    output: {
      file: 'dist/worker.js',
      format: 'iife',
    },
  },
];
