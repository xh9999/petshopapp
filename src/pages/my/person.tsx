import React, { useState, useEffect } from 'react';

import styles from './person.less';

import { Avatar, Form, Input, Button, Dialog, Radio, Space } from 'antd-mobile';

import request from 'umi-request';

export default function PersonPage() {
  const [user, setUser] = useState<any>({
    nikname: '',
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
    return data;
  };
  // 手机号
  const [tel, setTel] = useState<string>();
  // 新密码
  const [newPassword, setNew] = useState<string>();
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
    // updeteUser().then((data) => {
    //   setUser(data);
    //   // getUser();
    // });
  }, []);

  const onFinish = (values: any) => {
    Dialog.alert({
      // content: JSON.stringify(values),
      content: '修改成功',
    });
  };
  const [value, setValue] = useState<string>();

  return (
    <div>
      <div className={styles.portrait}>
        <Avatar
          className={styles.avatar}
          src={require('../../assets/img/header.png')}
          style={{ '--size': '100%' }}
        />
      </div>
      <Form
        className={styles.form}
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="middle">
            保存修改
          </Button>
        }
      >
        <Form.Item
          name="用户名"
          label="用户名"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input defaultValue={user.nickname} clearable />
        </Form.Item>

        <Form.Item name="favoriteFruits" label="性别">
          <Radio.Group
            value={value}
            onChange={(val) => {
              setValue(val.toString());
            }}
          >
            <Space direction="vertical">
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="手机号"
          label="手机号"
          rules={[{ required: true, message: '手机号不能为空' }]}
        >
          <Input
            // defaultValue={user.phone}
            clearable
            onChange={(value) => {
              setTel(value);
            }}
          />
        </Form.Item>
        <Form.Item label="短信验证码" extra={<a>发送验证码</a>}>
          <Input clearable />
        </Form.Item>
        <Form.Item
          name="密码"
          label="密码"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input
            // defaultValue={user.password}
            clearable
            type="password"
            onChange={(value) => {
              setNew(value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
