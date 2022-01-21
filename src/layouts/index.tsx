import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { TabBar, NavBar } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';
import { httpsGet, httpsPost } from '@/services';
import { Icons } from '../components/icon/index';
type UserInfoType = {
  address: object;
  nickname: string;
  no: string;
  phone: number;
  photo: string;
};
import {
  UserOutline,
  AppstoreOutline,
  CollectMoneyOutline,
} from 'antd-mobile-icons';
import styles from './index.css';
const BasicLayout: React.FC<RouteComponentProps> = (props) => {
  let [userInfo, setUserInfo] = useState<UserInfoType>();
  const [activeKey, setActiveKey] = useState('/');
  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppstoreOutline />,
    },
    {
      key: '/cart',
      title: '购物车',
      icon: <Icons />,
    },
    {
      key: '/myOrder',
      title: '订单详情',
      icon: <CollectMoneyOutline />,
    },
    {
      key: '/user',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ];
  // 监听路由的变化
  // history.listen(({ pathname }) => {
  //   // console.log(123)
  //   if (pathname == '/') {
  //     httpsGet('/api/user/getUser').then((data) => {
  //       setUserInfo(data);
  //     });
  //   }
  // });
  // setActiveKey('/cart')
  useEffect(() => {
    httpsGet('/api/user/getUser').then((data) => {
      setUserInfo(data);
    });
    return () => {
      setUserInfo = () => {};
    };
  }, []);
  // 登录
  const goLogin = () => {
    history.push('/login');
  };
  // 路由跳转
  const switchRouter = (title: string) => {
    setActiveKey(title);
    history.push({
      pathname: title,
    });
  };
  // 回退
  const goBack = () => {
    history.goBack();
  };
  const titel = () => {
    switch (props.location.pathname) {
      case '/':
        return <div>首页</div>;
        break;
      case '/cart':
        return <div>购物车</div>;
        break;
      case '/myOrder':
        return <div>订单详情</div>;
        break;
      case '/user':
        return <div>个人中心</div>;
        break;
      case '/shopping':
        return <div>商品详情</div>;
        break;
      case '/login':
        return <div>登录</div>;
        break;
      case '/register':
        return <div>注册</div>;
    }
  };
  const array = ['/', '/cart', '/myOrder', '/user'];
  return (
    <div>
      <NavBar
        onBack={goBack}
        backArrow={!array.includes(props.location.pathname)}
        className={styles.navbar}
        right={
          userInfo?.no ? null : <UserOutline onClick={goLogin}></UserOutline>
        }
      >
        {titel()}
      </NavBar>
      <div className={styles.container}>{props.children}</div>
      <TabBar
        className={styles.tabBar}
        activeKey={activeKey}
        onChange={(title) => {
          switchRouter(title);
        }}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};
export default BasicLayout;
