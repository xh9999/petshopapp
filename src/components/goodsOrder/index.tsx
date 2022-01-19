import { Form, Input, Button, Toast, Cascader, TextArea } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { httpsGet, httpsPost } from '@/services';
const GoodsOrders: React.FC = (props) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [nickValue, setnickValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [cityValue, setCityValue] = useState([]);
  // 详细地址
  const [addressValue, setAddressValue] = useState('');
  const [detailValue, setDetailValue] = useState('');
  useEffect(() => {
    httpsGet('/api/city').then((data) => {
      setCityValue(data);
    });
  }, []);
  const getPhone = (phone: string) => {
    setPhoneValue(phone);
  };
  const getNickname = (nickname: string) => {
    setnickValue(nickname);
  };
  const getAddress = (address: string) => {
    setAddressValue(address);
  };
  // 下单
  const orderGoods = () => {
    let obj = {
      name: nickValue,
      phone: phoneValue,
      address: [...value, addressValue],
      detail: detailValue,
    };
    console.log(value);
    console.log(obj);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>账单地址</h1>
      <Form
        className={styles.form}
        onFinish={orderGoods}
        footer={
          <>
            <Button block color="primary" size="large" type="submit">
              下单
            </Button>
          </>
        }
      >
        <Form.Item
          className={styles.item}
          name="nickname"
          label="姓名"
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input
            placeholder="姓名"
            className={styles.input}
            value={nickValue}
            onChange={(nickname) => {
              getNickname(nickname);
            }}
          />
        </Form.Item>
        <Form.Item
          className={styles.item}
          name="phone"
          label="电话"
          rules={[{ required: true, message: '电话不能为空' }]}
        >
          <Input
            placeholder="请输入电话"
            className={styles.input}
            value={phoneValue}
            onChange={(phone) => {
              getPhone(phone);
            }}
          />
        </Form.Item>
        <Form.Item className={styles.item} label="省市区">
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            选择地址
          </Button>
          <Cascader
            options={cityValue}
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
            value={value}
            onConfirm={setValue}
            onCancel={() => {
              setValue([]);
            }}
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
        </Form.Item>
        <Form.Item
          className={styles.item}
          name="address"
          label="详细地址"
          rules={[{ required: true, message: '地址不能为空' }]}
        >
          <Input
            placeholder="请输入地址"
            className={styles.input}
            value={addressValue}
            onChange={(address) => {
              getAddress(address);
            }}
          />
        </Form.Item>
        <Form.Item
          className={styles.item}
          rules={[{ required: true, message: '地址不能为空' }]}
        >
          <h2>其他信息</h2>
          <h4>订单备注</h4>
          <TextArea
            placeholder="有关订单的注释，例如，交货的特殊注释。"
            value={detailValue}
            style={{ border: 'solid 1px #ccc' }}
            onChange={(val) => {
              setDetailValue(val);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default GoodsOrders;
