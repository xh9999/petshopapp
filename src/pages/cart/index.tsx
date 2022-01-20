import React, { useState, useEffect } from 'react';
import Cartlist from '@/components/cart';
import { httpsGet, httpsPost } from '@/services';
import { CloseCircleOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { List, Image, Stepper, Button, Input, Empty, Space } from 'antd-mobile';
import styles from '../../components/cart/style.module.css';
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
const Cart: React.FC<IPropsType> = (props) => {
  // 去登录
  const goLogin = () => {
    history.push('/login');
  };
  const visibleCart = () => {
    if (props.users.userInfo.nickname) {
      return <Cartlist {...props}></Cartlist>;
    }
    if (!props.users.userInfo.nickname) {
      return (
        <div>
          {' '}
          <Empty
            style={{ padding: '64px 0' }}
            imageStyle={{ width: 128 }}
            description="你还没有登录"
          />
          <Button size="middle" className={styles.goback} onClick={goLogin}>
            <Space>
              <TextDeletionOutline />
              <span>去登录</span>
            </Space>
          </Button>
        </div>
      );
    }
  };
  // useEffect(() => {
  //   getUser();
  // }, []);
  return <div>{visibleCart()}</div>;
};
// // 这里还有一个意义就是将仓库中的数据注入到函数组件的props中
const mapStateToProps = ({ users }: { users: any }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(Cart);
