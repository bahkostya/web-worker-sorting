import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isProd = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
    },
    plugins: [serve(), !isProd && livereload()],
  },
  {
    input: 'src/worker.js',
    output: {
      file: 'dist/worker.js',
      format: 'iife',
    },
  },
];
