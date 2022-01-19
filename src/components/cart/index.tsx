import React, { useState, FC, useEffect } from 'react';
import { List, Image, Stepper, Button, Input, Empty, Space } from 'antd-mobile';
import { CloseCircleOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { getCartList, getUserInfo } from '@/pages/cart/services/idnex';
import styles from './style.module.css';
import { httpsGet, httpsPost } from '@/services';
import { history } from 'umi';

const Cartlist = () => {
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
  useEffect(() => {
    getUser();
    return () => {
      setCartList = () => {};
      setTotalPrice = () => {};
    };
  }, []);
  // const [totalPrice, setTotalPrice] = useState()
  const getUser = async () => {
    let sum = 0;
    const data = await httpsGet('/api/user/getUser');
    console.log(data);
    if (!data.no) {
      return;
    }
    const cart = await httpsGet('/api/cartList', { userNo: data.no });
    cart.forEach((item: any) => {
      sum += item.price * item.count;
    });
    setTotalPrice(sum);
    setCartList(cart);
  };
  const numChange = async (values: number, item: any) => {
    console.log(values);
    setNum(values);
    const data = await httpsGet('/api/updata', {
      id: item.goodsNo,
      count: values,
      userNo: item.userNo,
    });
    getUser();
  };
  // 删除商品
  const delGoods = async (item: any) => {
    const data = await httpsGet('/api/delete', {
      id: item.goodsNo,
    });
    getUser();
  };
  // 返回首页
  const goShop = () => {
    history.push('/');
  };
  const empty = () => {
    if (cartList?.length == 0) {
      return (
        <div>
          <Empty
            style={{ padding: '64px 0' }}
            imageStyle={{ width: 128 }}
            description="您的购物车目前是空的"
          />
          <Button size="middle" className={styles.goback} onClick={goShop}>
            <Space>
              <TextDeletionOutline />
              <span>返回商店</span>
            </Space>
          </Button>
        </div>
      );
    }
  };
  const [num, setNum] = useState(1);
  const [value, setValue] = useState('');
  return (
    <div>
      {/* 判断当前购物车列表的长度是否为空，不为空显示购物车列表，为空则显示空状态 */}
      <div>
        {/* 商品列表 */}
        <List style={{ '--border-bottom': '2px dotted #ccc' }}>
          {cartList?.map((item, index) => {
            return (
              <List.Item
                key={index}
                prefix={
                  <CloseCircleOutline
                    style={{ fontWeight: 700 }}
                    color="var(--adm-color-weak)"
                    onClick={() => {
                      delGoods(item);
                    }}
                  />
                }
                description={
                  <div>
                    <Image
                      src={item.img}
                      width={90}
                      height={90}
                      fit="cover"
                      style={{ borderRadius: 4 }}
                    />
                  </div>
                }
                extra={
                  <div className={styles.proPrice}>
                    <p className={styles.price}>￥{item.price.toFixed(2)}</p>
                    <Stepper
                      min={1}
                      className={styles.count}
                      style={{
                        '--border': '1px solid #f5f5f5',
                        '--input-font-color': '#000',
                        '--button-text-color': '#000',
                        '--input-background-color': '#fff',
                        '--active-border': '1px solid #1677ff',
                      }}
                      value={item.count}
                      onChange={(values) => {
                        numChange(values, item);
                      }}
                    />
                  </div>
                }
              >
                <div className={styles.product}>
                  <p className={styles.proName}>{item.title}</p>
                  <p className={styles.proCate}>{item.taste}</p>
                </div>
              </List.Item>
            );
          })}
        </List>
        {/* 价格总计 */}
        <List>
          <List.Item className={styles.cartCount}>购物车总计</List.Item>
          <List.Item
            description={<div className={styles.context}>运费</div>}
            extra={
              <div>
                <div className={styles.ctxprice}>￥{totalPrice.toFixed(2)}</div>
                <div className={styles.ctxprice}>普通快递:￥50.00</div>
              </div>
            }
          >
            <div className={styles.context}>购物车小计</div>
          </List.Item>
          <List.Item
            extra={
              <div className={styles.ctxprice}>
                ￥{(totalPrice + 50).toFixed(2)}
              </div>
            }
          >
            <div className={styles.context}>订单总计</div>
          </List.Item>
        </List>
        {/* 提交按钮 */}
        <Button
          block
          className={styles.addCart}
          color="warning"
          size="large"
          onClick={() => history.push('/goodsorder')}
        >
          前往收银台
        </Button>
        {/* 优惠券 */}
        <List>
          <List.Item className={styles.cartCount}>优惠券:</List.Item>
        </List>
        <Input
          className={styles.input}
          style={{
            '--placeholder-color': '#999',
            '--font-size': '16px',
          }}
          placeholder="优惠券代码"
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        />
        <Button className={styles.coupon} style={{ '--border-color': '#777' }}>
          使用优惠券
        </Button>
      </div>
      {/* 空状态 */}
      {empty()}
    </div>
  );
};

export default Cartlist;
