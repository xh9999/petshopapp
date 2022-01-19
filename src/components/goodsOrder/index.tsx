import {
  Form,
  Input,
  Button,
  Toast,
  Cascader,
  TextArea,
  List,
  Image,
  Collapse,
  Radio,
  Checkbox,
} from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { httpsGet, httpsPost } from '@/services';
type RadioValue = string | number;
const GoodsOrders: React.FC = (props) => {
  const zfbSrc =
    'http://5c99816b4d469.t73.qifeiye.com/qfy-content/plugins/alipay-for-bitcommerce/images/alipay.png';
  const wxSrc =
    'http://5c99816b4d469.t73.qifeiye.com/qfy-content/plugins/wc-wechatpay/images/qfy_weixinpay_for_wc.png';
  const users = [
    {
      id: 10,
      title: '维克 营养膏克补软膏发育宠狗用猫用',
      price: '￥95.00',
      src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy84YzQ2MDkwNGUwYWM1OWViYjczYjJjZWZhYzMwMzRiZi05MC53ZWJw.webp',
    },
    {
      id: 14,
      title: '维斯康 VITSCAN宠物保健品海棠颗粒',
      price: '￥98.00',
      src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8yZjg3NDUxYTY2ZWVkMmFmODVhNGZjYmZhZjhlYWNlZi05MC53ZWJw.webp',
    },
  ];
  const [phoneValue, setPhoneValue] = useState('');
  const [nickValue, setnickValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [cityValue, setCityValue] = useState([]);
  // 详细地址
  const [addressValue, setAddressValue] = useState('');
  const [detailValue, setDetailValue] = useState('');
  const [value1, setValue1] = useState<RadioValue>();
  type GoodsType = {
    count: number;
    goodsNo: string;
    img: string;
    price: number;
    taste: string;
    title: string;
  };
  let [cartList, setCartList] = useState<GoodsType[]>();
  let [totalPrice, setTotalPrice] = useState(0);
  const getUser = async () => {
    let sum = 0;
    const data = await httpsGet('/api/user/getUser');
    const cart = await httpsGet('/api/cartList', { userNo: data.no });
    console.log(cart);
    cart.forEach((item: any) => {
      sum += item.price * item.count;
    });
    setTotalPrice(sum);
    setCartList(cart);
  };
  useEffect(() => {
    httpsGet('/api/city').then((data) => {
      setCityValue(data);
    });
    getUser();
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
        <Form.Item>
          <div>
            <p className={styles.order}>订单详情</p>
            <List className={styles.list}>
              <List.Item
                className={styles.list}
                extra={<span className={styles.xiaoji}>小计</span>}
              >
                商品
              </List.Item>
              {cartList?.map((user) => (
                <List.Item
                  className={styles.list}
                  style={{ fontSize: '12px' }}
                  key={user.goodsNo}
                  prefix={
                    <Image
                      src={user.img}
                      style={{ borderRadius: 20 }}
                      fit="cover"
                      width={40}
                      height={40}
                    />
                  }
                  extra={'￥' + (user.price * user.count).toFixed(2)}
                >
                  {user.title}&nbsp;×&nbsp;{user.count}
                </List.Item>
              ))}
            </List>
            <List>
              <List.Item
                className={styles.list}
                extra={'￥' + totalPrice.toFixed(2)}
              >
                购物车小计
              </List.Item>
              <List.Item className={styles.list} extra="普通快递￥50.00">
                运费
              </List.Item>
              <List.Item
                className={styles.list}
                extra={'￥' + (totalPrice + 50).toFixed(2)}
              >
                订单总计
              </List.Item>
            </List>
            <Radio.Group
              value={value1}
              onChange={(val: RadioValue) => {
                setValue1(val);
              }}
            >
              <Collapse accordion>
                <Collapse.Panel
                  className={styles.list}
                  key="1"
                  title={
                    <div>
                      <Radio
                        style={{
                          '--icon-size': '18px',
                          '--font-size': '14px',
                          '--gap': '6px',
                        }}
                        value="bank"
                      >
                        银行汇款(线下)
                      </Radio>
                    </div>
                  }
                >
                  直接付款到我们的银行账户。请使用订单号作为付款名目。我们会在资金到账后配送订单
                </Collapse.Panel>
                <Collapse.Panel
                  className={styles.list}
                  key="2"
                  title={
                    <div>
                      <Radio
                        style={{
                          '--icon-size': '18px',
                          '--font-size': '14px',
                          '--gap': '6px',
                        }}
                        value="zfb"
                      >
                        支付宝
                        <Image src={zfbSrc} />
                      </Radio>
                    </div>
                  }
                >
                  使用支付宝付款，如果您没有支付宝账户，也可以通过借记卡或者信用卡付款
                </Collapse.Panel>
                <Collapse.Panel
                  className={styles.list}
                  key="3"
                  title={
                    <div>
                      <Radio
                        style={{
                          '--icon-size': '18px',
                          '--font-size': '14px',
                          '--gap': '6px',
                        }}
                        value="wx"
                      >
                        微信支付
                        <Image src={wxSrc} />
                      </Radio>
                    </div>
                  }
                >
                  通过微信扫码付款，或者公众号支付。
                </Collapse.Panel>
              </Collapse>
            </Radio.Group>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default GoodsOrders;
