import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/myOrder', component: '@/pages/myOrder/index' }],
  fastRefresh: {},
  mock: {},
  proxy: {
    '/api': {
      target: 'http://110.42.190.78:8888',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
