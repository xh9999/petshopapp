import React, { useState, useEffect } from 'react';
import Cartlist from '@/components/cart';
import { httpsGet, httpsPost } from '@/services';
import { CloseCircleOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { List, Image, Stepper, Button, Input, Empty, Space } from 'antd-mobile';
import styles from '../../components/cart/style.module.css';
import { history } from 'umi';
function Cart() {
  let [visible, setVisible] = useState(false);
  const getUser = async () => {
    const data = await httpsGet('/api/user/getUser');
    if (data.no) {
      setVisible(true);
    }
  };
  // 去登录
  const goLogin = () => {
    history.push('/login');
  };
  const visibleCart = () => {
    if (visible) {
      return <Cartlist></Cartlist>;
    }
    if (!visible) {
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
    // if () {

    // }
  };
  useEffect(() => {
    getUser();
  }, []);
  return <div>{visibleCart()}</div>;
}
export default Cart;
