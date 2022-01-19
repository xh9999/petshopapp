import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/shopping', component: '@/pages/shopping/shopping.tsx' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://110.42.190.78:8888/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
  // mock:{}
  mfsu: {},
});
