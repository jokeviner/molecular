// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  outputPath: './docs',
  base: '/molecular/',
  publicPath: '/molecular/',
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    //'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  define: {
    API_URL: 'https://m1.littlebrother.icu',
  },
});
