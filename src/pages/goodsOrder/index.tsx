import React from 'react';
import GoodsOrders from '@/components/goodsOrder';
import { ConnectProps } from 'umi';
interface IPropsType extends ConnectProps {
  users: {
    userInfo: UserItem;
  };
}
interface UserItem {
  phone: number | string;
  nickname: string;
  no?: string;
  photo: string;
  address: string | object;
}
const GoodsOrder: React.FC<IPropsType> = (prpos) => {
  return <GoodsOrders {...prpos}></GoodsOrders>;
};
export default GoodsOrder;
