import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' }
      ]
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      'target': 'http://110.42.190.78:8888',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
