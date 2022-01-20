import React, { useState, useEffect } from 'react';
import styles from './address.less';
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
import request from 'umi-request';
export default function AddressPage() {
  const [user, setUser] = useState<any>({
    nikname: '',
    phone: 0,
    password: '',
    photo: '',
    address: {},
    no: '',
  });
  // 获取地址数据
  const getUser = async () => {
    // 向服务器发送请求
    const data = await request('/api/user/getUser', { data: { id: 1 } });
    console.log(data, '服务器的数据');
    return data;
  };

  // 收货人
  const [shou, setshou] = useState<string>();
  // 省市区
  const [pca, setPca] = useState<string[]>([]);
  // 详细地址
  const [details, setDetails] = useState<string>();
  // 手机号
  const [tel, setTel] = useState<string>();
  // 修改地址数据
  const updeteAddress = async () => {
    // 向服务器发送请求
    const data = await request.post('/api/user/modify', {
      data: { show: shou, phone: tel },
    });
    console.log(data, '服务器的数据');
    return data;
  };

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
    updeteAddress().then((data) => {
      setUser(data);
      // getUser();
    });
  }, []);

  const onFinish = (values: any) => {
    Dialog.alert({
      content: JSON.stringify(values),
    });
  };
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string[]>([]);
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
          value={value}
          onConfirm={setValue}
          onSelect={(val, extend) => {
            console.log('onSelect', val, extend.items);
          }}
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
        {/* <Form.Item className={styles.item1} name='省市区' label='省市区' rules={[{ required: true, message: '省市区不能为空' }]}>
          <Input className={styles.province} placeholder={add[0]} readOnly />
          <Input className={styles.city} placeholder={add[1]} readOnly />
          <Input className={styles.area} placeholder={add[2]}  readOnly/>
          <Button
          color='warning'
          className={styles.select}
          onClick={async () => {
            const value = await Cascader.prompt({
              options,
              title: '选择地址',
            })
            Toast.show(value ? `你选择了 ${value.join('-')}`: '你没有进行选择')
            console.log(value)
          }}
        >
          选择地址
        </Button>
        </Form.Item> */}
        <Form.Item
          name="收货人"
          label="收货人"
          rules={[{ required: true, message: '收货人不能为空' }]}
        >
          <Input
            defaultValue=""
            clearable
            onChange={(value) => {
              setshou(value);
              console.log(shou);
            }}
          />
        </Form.Item>
        {/* 选择器 */}
        <RenderChildrenDemo />
        <Form.Item
          name="详细地址"
          label="详细地址"
          rules={[{ required: true, message: '详细地址不能为空' }]}
        >
          <Input
            defaultValue=""
            clearable
            onChange={(value) => {
              setDetails(value);
              console.log(details);
            }}
          />
        </Form.Item>
        <Form.Item
          name="手机号"
          label="手机号"
          rules={[{ required: true, message: '手机号不能为空' }]}
        >
          <Input
            defaultValue=""
            clearable
            onChange={(value) => {
              setTel(value);
              console.log(tel);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
