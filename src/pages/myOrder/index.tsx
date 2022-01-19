import styles from './index.less';
import moment from 'moment';
import React, { useState, useEffect, FC } from 'react';
import { Tabs, Button, Dialog, Empty, Space } from 'antd-mobile';
import { UnorderedListOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { request, history } from 'umi';
import MyAllOrder from '../../components/myorder';
type good = Array<goodsItemType>;
type goodsItemType = {
  address: string;
  date: string;
  name: string;
  orderNo: string;
  phone: number;
  status: number;
  userNo: string;
  goods: Array<goodsType>;
};
type goodsType = {
  count: number;
  goodsNo: string;
  img: string;
  price: number;
  title: string;
  userNo: string;
};
const IndexPage: FC = () => {
  const [goods, setgoods] = useState<good>();
  const [time, settime] = useState<string>();
  const [userStatus, setUserStatus] = useState<boolean>(false);
  useEffect(() => {
    // getRemoteList();
    getOrderList().then((data) => {
      if (data != 0) {
        setUserStatus(true);
        setgoods(data.reverse());
        var c = moment(data.date).format('YYYY-MM-DD');
        settime(c);
      }
    });
  }, []);
  const getOrderList = async () => {
    let user = await request('/api/user/getUser');
    if (user.no) {
      let data = await request(`/api/orderall?id=${user.no}`);
      return data.order;
    }
    return 0;
  };
  const sumPrice = (item: goodsType[]) => {
    let sum = 0;
    item.forEach((items) => {
      sum += items.price * items.count;
    });
    return sum.toFixed(2);
  };
  const status = () => {
    if (userStatus) {
      return <MyAllOrder list={goods}></MyAllOrder>;
    } else {
      return (
        <div>
          {' '}
          <Empty
            style={{ padding: '64px 0' }}
            imageStyle={{ width: 128 }}
            description="您的购物车目前是空的"
          />
          <Button
            size="middle"
            className={styles.goback}
            onClick={() => {
              history.push('/login');
            }}
          >
            <Space>
              <TextDeletionOutline />
              <span>去登录</span>
            </Space>
          </Button>
        </div>
      );
    }
  };
  return <div>{status()}</div>;
};

export default IndexPage;
