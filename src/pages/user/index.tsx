import React, { useState, useEffect } from 'react';
import { Button, Space, List, Toast } from 'antd-mobile';
import { httpsGet, httpsPost } from '@/services';
import { Card } from '../../components/icon/index';
import { history, connect, ConnectProps } from 'umi';
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
import {
  UnorderedListOutline,
  UserOutline,
  SetOutline,
} from 'antd-mobile-icons';
const User: React.FC<IPropsType> = ({ users }) => {
  const layout = async () => {
    const data = await httpsGet('/api/user/exit');
    history.push('/login');
  };
  return (
    <div>
      <List>
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => {
            if (users.userInfo.no) {
              history.push('/myOrder');
            } else {
              Toast.show({
                content: '你还没有登录',
                afterClose: () => {},
              });
            }
          }}
        >
          我的订单
        </List.Item>
        <List.Item prefix={<Card />} onClick={() => {}}>
          优惠券
        </List.Item>
        <List.Item prefix={<UserOutline />} onClick={() => {}}>
          个人资料
        </List.Item>
        {users.userInfo.no ? (
          <List.Item prefix={<SetOutline />} onClick={layout}>
            退出登录
          </List.Item>
        ) : (
          ''
        )}
      </List>
    </div>
  );
};
const mapStateToProps = ({ users }: { users: any }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(User);
