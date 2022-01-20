import React, { useState, useEffect } from 'react';
import styles from './my.less';
import { Avatar, Tag, List, Button, Modal, Toast } from 'antd-mobile';
import {
  EditSOutline,
  TextOutline,
  UserOutline,
  EnvironmentOutline,
} from 'antd-mobile-icons';
import { history } from 'umi';
import { sleep } from './sleep';
import { request } from 'umi';
export default function MyPage() {
  const [boo, setBoo] = useState<boolean>();
  const [user, setUser] = useState<any>({
    nickname: '',
    phone: 0,
    password: '',
    photo: '',
    address: {},
    no: '',
  });
  // 获取用户数据
  const getUser = async () => {
    // 向服务器发送请求
    const data = await request('/api/user/getUser');
    console.log(data, '服务器的数据');
    return data;
  };
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      if (data.nickname === '') {
        let a = false;
        setBoo(a);
      } else {
        let a = true;
        setBoo(a);
      }
    });
  }, []);

  // 退出登录弹窗
  const tan = () => {
    Modal.confirm({
      content: '是否退出登录',
      onConfirm: async () => {
        await sleep(1000);
        Toast.show({
          icon: 'success',
          content: '退出成功',
          position: 'bottom',
        });
      },
    });
  };
  return (
    <div>
      <div className={styles.my_details}>
        <Avatar
          className={styles.avatar}
          src={user.photo}
          style={{ '--size': '100%' }}
        />
        <div className={styles.right}>
          <span className={styles.name}>{user.nickname}</span>
          <span className={styles.welcome}>欢迎回来</span>
          <Tag
            className={styles.tag}
            color="danger"
            onClick={() => history.push('/person')}
          >
            <EditSOutline />
            修改
          </Tag>
        </div>
      </div>
      <List className={styles.list}>
        <List.Item
          prefix={<TextOutline />}
          onClick={() => history.push('/order')}
        >
          我的账单
        </List.Item>
        <List.Item
          prefix={<UserOutline />}
          onClick={() => history.push('/person')}
        >
          个人资料
        </List.Item>
        <List.Item
          prefix={<EnvironmentOutline />}
          onClick={() => history.push('/address')}
        >
          账单地址
        </List.Item>
      </List>
      <Button
        color="danger"
        className={styles.exit}
        block
        onClick={
          boo
            ? tan
            : () => {
                history.push('/login');
              }
        }
      >
        {boo ? '退出登录' : '立即登录'}
      </Button>
    </div>
  );
}
