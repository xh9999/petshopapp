import React, { useState, useEffect } from 'react';
import styles from './address.less';
import { httpsGet, httpsPost } from '@/services';
import { options } from './city';
import {
  Form,
  Input,
  Button,
  Dialog,
  Cascader,
  Toast,
  Space,
} from 'antd-mobile';
type objType = {
  address: [];
  name: string;
  eamil: string;
  phone: string;
};
interface UserItem {
  phone: number | string;
  nickname: string;
  no?: string;
  photo: string;
  address?: objType;
}
import request from 'umi-request';
export default function AddressPage() {
  const [user, setUser] = useState<UserItem>();
  // 收货人
  const [shou, setshou] = useState<string>();
  // 省市区
  const [pca, setPca] = useState<string[]>([]);
  // 详细地址
  const [details, setDetails] = useState<string>();
  // 手机号
  const [tel, setTel] = useState<string>();
  const [visible, setVisible] = useState(false);
  // 邮件
  const [email, setEmail] = useState<string>();
  // 获取地址数据
  const getUser = async () => {
    // 向服务器发送请求
    const data = await httpsGet('/api/user/getUser');
    setshou(data.nickname);
    setUser(data);
    if (data.address) {
      setPca(data.address.address);
      setDetails(data.address.address[3]);
      setEmail(data.address.email);
    }
    setTel(data.phone);
    // setUser(data)
  };
  // const [value, setValue] = useState<string[]>([]);
  // 修改地址数据
  const updeteAddress = async () => {
    // 向服务器发送请求
    const data = await request.post('/api/user/modify', {
      data: { show: shou, phone: tel },
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  // 修改账单地址
  const onFinish = async (values: any) => {
    if (!shou || pca.length == 0 || !details || !tel) {
      Dialog.alert({
        content: JSON.stringify('请填写完整的账单地址'),
      });
    } else {
      let obj = {
        address: [...pca, details],
        name: shou,
        email: email,
        phone: tel,
      };
      const data = await httpsPost('/api/user/address', {
        phone: user?.phone,
        address: obj,
      });
      if (data.code === 0) {
        Dialog.alert({
          content: JSON.stringify('保存地址成功'),
        });
      }
    }
  };
  function RenderChildrenDemo() {
    return (
      <Space align="center" className={styles.space}>
        <Button
          className={styles.btn}
          color="danger"
          onClick={() => {
            setVisible(true);
          }}
        >
          选择地址
        </Button>
        <Cascader
          options={options}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          value={pca}
          onConfirm={setPca}
          onSelect={(val, extend) => {}}
        >
          {(items) => {
            if (items.every((item) => item === null)) {
              return '未选择';
            } else {
              return items.map((item) => item?.label ?? '未选择').join('-');
            }
          }}
        </Cascader>
      </Space>
    );
  }

  return (
    <div>
      <Form
        className={styles.form}
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="middle">
            保存修改
          </Button>
        }
      >
        <h3>账单地址</h3>
        <Form.Item label="收货人">
          <Input
            defaultValue={shou}
            clearable
            value={shou}
            onChange={(value) => {
              setshou(value);
            }}
          />
        </Form.Item>
        {/* 选择器 */}
        <RenderChildrenDemo />
        <Form.Item
          label="详细地址"
          rules={[{ required: true, message: '详细地址不能为空' }]}
        >
          <Input
            defaultValue=""
            clearable
            value={details}
            onChange={(value) => {
              setDetails(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="手机号"
          rules={[{ required: true, message: '手机号不能为空' }]}
        >
          <Input
            defaultValue=""
            value={tel}
            clearable
            onChange={(value) => {
              setTel(value);
            }}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={email}
            clearable
            onChange={(value) => {
              setEmail(value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
