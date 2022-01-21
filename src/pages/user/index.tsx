import React, { useState, useEffect } from 'react';
import { Button, Space, List, Toast, Avatar } from 'antd-mobile';
import { httpsGet, httpsPost } from '@/services';
import { Card } from '../../components/icon/index';
import { history, connect, ConnectProps } from 'umi';
import styels from './index.less';
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
  EnvironmentOutline,
} from 'antd-mobile-icons';
const User: React.FC<IPropsType> = ({ users }) => {
  const layout = async () => {
    const data = await httpsGet('/api/user/exit');
    history.push('/login');
  };
  const person = () => {
    if (users.userInfo.no) {
      return (
        <>
          <Avatar
            src={require('../../assets/img/header.png')}
            style={{ '--size': '64px' }}
          />
          <div className={styels.info}>
            <p className={styels.p}>{users.userInfo.nickname}</p>
            <div>
              <Button size="mini">修改密码</Button>
              <Button size="mini" className={styels.modify}>
                修改手机
              </Button>
            </div>
          </div>
        </>
      );
    } else {
      return <Avatar src="" style={{ '--size': '64px' }} />;
    }
  };
  return (
    <div>
      <div className={styels.header}>{person()}</div>
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
        <List.Item
          prefix={<UserOutline />}
          onClick={() => {
            if (users.userInfo.no) {
              history.push('/person');
            } else {
              Toast.show({
                content: '你还没有登录',
                afterClose: () => {},
              });
            }
          }}
        >
          个人资料
        </List.Item>
        <List.Item
          prefix={<EnvironmentOutline />}
          onClick={() => {
            if (users.userInfo.no) {
              history.push('/address');
            } else {
              Toast.show({
                content: '你还没有登录',
                afterClose: () => {},
              });
            }
          }}
        >
          账单地址
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
