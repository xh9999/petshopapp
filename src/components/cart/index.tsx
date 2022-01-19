import React, { useState, FC, useEffect } from 'react';
import { List, Image, Stepper, Button, Input, Empty, Space } from 'antd-mobile';
import { CloseCircleOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { getCartList, getUserInfo } from '@/pages/cart/services/idnex';
import styles from './style.module.css';
import { history } from 'umi';

const Cartlist = () => {
  useEffect(() => {
    getUser();
    getCartsList();
  }, []);

  const getUser = async () => {
    let data = await getUserInfo();
    console.log(data);
  };

  const getCartsList = async () => {
    let data = await getCartList();
    console.log(data, 'xxxxxxxxxxxxx');
  };

  const numChange = (value: number) => {
    setNum(value);
    console.log(value, '数量改变了');
  };

  // 返回首页
  const goShop = () => {
    history.push('/');
  };

  const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';

  const [num, setNum] = useState(1);
  const [value, setValue] = useState('');

  return (
    <div>
      {/* 判断当前购物车列表的长度是否为空，不为空显示购物车列表，为空则显示空状态 */}
      <div>
        {/* 商品列表 */}
        <List style={{ '--border-bottom': '2px dotted #ccc' }}>
          <List.Item
            prefix={
              <CloseCircleOutline
                style={{ fontWeight: 700 }}
                color="var(--adm-color-weak)"
                onClick={() => {
                  console.log('删除商品');
                }}
              />
            }
            description={
              <div>
                <Image
                  src={demoSrc}
                  width={90}
                  height={90}
                  fit="cover"
                  style={{ borderRadius: 4 }}
                />
              </div>
            }
            extra={
              <div className={styles.proPrice}>
                <p className={styles.price}>商品价格</p>
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
                  value={num}
                  onChange={numChange}
                />
              </div>
            }
          >
            <div className={styles.product}>
              <p className={styles.proName}>商品名称</p>
              <p className={styles.proCate}>商品描述</p>
            </div>
          </List.Item>
        </List>
        {/* 价格总计 */}
        <List>
          <List.Item className={styles.cartCount}>购物车总计</List.Item>
          <List.Item
            description={<div className={styles.context}>运费</div>}
            extra={
              <div>
                <div className={styles.ctxprice}>￥539.00</div>
                <div className={styles.ctxprice}>普通快递:￥50.00</div>
              </div>
            }
          >
            <div className={styles.context}>购物车小计</div>
          </List.Item>
          <List.Item extra={<div className={styles.ctxprice}>￥589.00</div>}>
            <div className={styles.context}>订单总计</div>
          </List.Item>
        </List>
        {/* 提交按钮 */}
        <Button
          block
          className={styles.addCart}
          color="warning"
          size="large"
          onClick={() => history.push('/order')}
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
    </div>
  );
};

export default Cartlist;
