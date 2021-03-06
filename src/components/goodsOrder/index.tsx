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
import { history, connect, ConnectProps } from 'umi';
import { httpsGet, httpsPost } from '@/services';
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
  address: objType;
}
type objType = {
  address: [];
  name: string;
  eamil: string;
  phone: string;
};
const GoodsOrders: React.FC<IPropsType> = ({ users }) => {
  const zfbSrc =
    'http://5c99816b4d469.t73.qifeiye.com/qfy-content/plugins/alipay-for-bitcommerce/images/alipay.png';
  const wxSrc =
    'http://5c99816b4d469.t73.qifeiye.com/qfy-content/plugins/wc-wechatpay/images/qfy_weixinpay_for_wc.png';
  // let [address, setAddress] = useState('')
  let [phoneValue, setPhoneValue] = useState<any>();
  let [nickValue, setnickValue] = useState('');
  let [visible, setVisible] = useState(false);
  let [value, setValue] = useState<any>();
  let [cityValue, setCityValue] = useState([]);
  // 详细地址
  let [addressValue, setAddressValue] = useState('');
  let [detailValue, setDetailValue] = useState('');
  let [value1, setValue1] = useState<any>('bank');
  let [userInfo, setUserInfo] = useState<any>();
  // let [goodsAddress,setgoodsAddress]=useState<any>()
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
    // setgoodsAddress(data.address.address[3])
    setUserInfo(data);
    if (data.address) {
      setValue(data.address.address);
      setAddressValue(data.address.address[3]);
    }
    setPhoneValue(data.phone);
    setnickValue(data.nickname);
    const cart = await httpsGet('/api/cartList', { userNo: data.no });
    cart.forEach((item: any) => {
      sum += item.price * item.count;
    });
    setTotalPrice(sum);
    setCartList(cart);
  };
  const setUserInfos = () => {
    setPhoneValue(users.userInfo.phone);
  };
  useEffect(() => {
    httpsGet('/api/city').then((data) => {
      setCityValue(data);
    });
    getUser();
    setUserInfos();
    return () => {
      setCityValue = () => {};
      setTotalPrice = () => {};
      setUserInfo = () => {};
    };
  }, []);
  const getPhone = (phone: any) => {
    setPhoneValue(phone);
  };
  const getNickname = (nickname: string) => {
    setnickValue(nickname);
  };
  const getAddress = (address: string) => {
    setAddressValue(address);
  };
  const butInfo = (type: string) => {
    if (type === 'bank') {
      return '下单';
    } else if (type == 'zfb') {
      return '到支付宝付款';
    } else {
      return '使用微信扫码支付';
    }
  };
  // 下单
  const orderGoods = async () => {
    // console.log()
    if (!nickValue || !phoneValue || !value || !addressValue) {
      Toast.show({
        content: '请将账单地址填写完整',
      });
    } else {
      let obj = {
        name: nickValue,
        phone: phoneValue,
        address: [...value, addressValue].join(''),
        goods: cartList,
        userNo: userInfo.no,
        orderNo: Math.random().toString().slice(2, 8),
      };
      const data = await httpsPost('/api/order', obj);
      if (data.code == 0) {
        const data1 = await httpsGet(`/api/deletecart?id=${userInfo.no}`);
        history.push('/myOrder');
      }
    }
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
              {butInfo(value1)}
            </Button>
          </>
        }
      >
        <Form.Item className={styles.item} label="姓名">
          <Input
            placeholder="姓名"
            className={styles.input}
            value={nickValue}
            defaultValue={nickValue.toString()}
            onChange={(nickname) => {
              getNickname(nickname);
            }}
          />
        </Form.Item>
        <Form.Item
          className={styles.item}
          label="电话"
          rules={[{ required: true, message: '电话不能为空' }]}
        >
          <Input
            placeholder="请输入电话"
            className={styles.input}
            defaultValue={phoneValue}
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
        </Form.Item>
        <Form.Item className={styles.item} label="详细地址">
          <Input
            placeholder="请输入地址"
            className={styles.input}
            defaultValue={addressValue}
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
              onChange={(val) => {
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
const mapStateToProps = ({ users }: { users: any }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(GoodsOrders);
