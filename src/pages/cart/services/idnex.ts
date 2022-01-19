import { request } from 'umi';
export const getCartList = async () => {
  // 向服务器发送请求
  const data = await request('/api/cartList');
  return data;
};

export const getUserInfo = async () => {
  // 向服务器发送请求
  const data = await request('/api/getUser');
  return data;
};
