import styles from './index.less';
import moment from 'moment';
import React, { useState, useEffect, FC } from 'react';
import { Tabs, Button, Dialog, Empty, Space } from 'antd-mobile';
import { UnorderedListOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { request, history, connect, ConnectProps } from 'umi';
import MyAllOrder from '../../components/myorder';
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
const IndexPage: FC<IPropsType> = (props) => {
  let [goods, setgoods] = useState<good>();
  let [time, settime] = useState<string>();
  let [userStatus, setUserStatus] = useState<boolean>(false);
  useEffect(() => {
    getOrderList().then((data) => {
      if (data != 0) {
        setUserStatus(true);
        setgoods(data.reverse());
      }
    });
    return () => {
      setUserStatus = () => {};
      setgoods = () => {};
    };
  }, []);
  const getOrderList = async () => {
    if (props.users.userInfo.no) {
      let data = await request(`/api/orderall?id=${props.users.userInfo.no}`);
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
          <Empty
            style={{ padding: '64px 0' }}
            imageStyle={{ width: 128 }}
            description="还没有登录"
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
const mapStateToProps = ({ users }: { users: any }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(IndexPage);
