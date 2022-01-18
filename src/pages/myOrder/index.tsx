import styles from './index.less';
import moment from 'moment';
import React, { useState, useEffect, FC } from 'react';
import { Tabs, Button, Dialog } from 'antd-mobile';
import { UnorderedListOutline } from 'antd-mobile-icons';
import { request } from 'umi';
type good = Array<goodsItemType>;
type goodsItemType = {
  address: string;
  date: string;
  name: string;
  orderNo: string;
  phone: number;
  status: number;
  userNo: string;
  goods: Array<goodsType>;
};
type goodsType = {
  count: number;
  goodsNo: string;
  img: string;
  price: number;
  title: string;
  userNo: string;
};
type haha = {
  _id: string;
  title: string;
  taste: string;
  price: number;
  count: number;
  img: string;
  userNo: string;
  __v: number;
};

const IndexPage: FC = () => {
  const [goods, setgoods] = useState<good>();

  const [time, settime] = useState<string>();
  useEffect(() => {
    // getRemoteList();
    getOrderList().then((data) => {
      setgoods(data);
      console.log(data, '=======');
      var c = moment(data.date).format('YYYY-MM-DD');
      settime(c);
    });

    // getRemoteList().then((data) => {

    // });
  }, []);
  console.log(goods);
  const getRemoteList = async () => {
    // 向服务器发送请求
    let data = await request('/api/user/getUser');
    console.log(data);
    return data;
  };
  const getOrderList = async () => {
    let data = await request('/api/orderall?id=551867');
    console.log(data);
    return data.order;
  };
  const sumPrice = (item: goodsType[]) => {
    let sum = 0;
    item.forEach((items) => {
      sum += items.price * items.count;
    });
    return sum.toFixed(2);
  };
  return (
    <div className="order">
      <div className={styles.title}>
        <UnorderedListOutline
          style={{ fontSize: 23, position: 'absolute', top: '16px' }}
        />
        <span className={styles.sp}>我的订单</span>
      </div>
      <div className={styles.container}>
        <Tabs>
          <Tabs.Tab title="全部订单" key="order">
            {goods?.map((item, index) => {
              return (
                <div key={index} className={styles.list}>
                  <div className={styles.titles}>
                    <span className={styles.details}>
                      订单号:{item?.orderNo}
                    </span>
                    <span className={styles.details}>
                      {item?.status == 1 ? '状态:已支付' : '状态:未支付'}
                    </span>
                    <span className={styles.details}>日期:{time}</span>
                    <span className={styles.total}>
                      合计:￥{sumPrice(item.goods)}
                    </span>
                  </div>

                  <ul className={styles.goodsList}>
                    {item?.goods.map((item, index) => {
                      return (
                        <li key={index} className={styles.li}>
                          <div className={styles.Goodsdetails}>
                            <div className={styles.one}>
                              <img
                                className={styles.Goodsimg}
                                src={item?.img}
                              />
                            </div>
                            <div className={styles.two}>
                              <span className={styles.name}>{item?.title}</span>
                            </div>
                            <div className={styles.three}>
                              <span>
                                {item?.count}*{item?.price}
                              </span>
                            </div>
                            <div className={styles.four}>
                              <span>
                                ￥{(item?.count * item?.price).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className={styles.look}>
                    <Button
                      block
                      onClick={() =>
                        Dialog.confirm({
                          title: '订单详情',
                          content: (
                            <div>
                              <div className={styles.detitles}>
                                商品<span className={styles.heji}>合计</span>
                              </div>
                              <div className={styles.decontainer}>
                                {item?.goods.map((item, index) => {
                                  return (
                                    <div key={index} className={styles.deone}>
                                      <img
                                        className={styles.deGoodsimg}
                                        src={item?.img}
                                      />
                                      <div className={styles.dename}>
                                        {item?.title}
                                      </div>
                                      <span className={styles.deleft}>
                                        ￥
                                        {(item?.count * item?.price).toFixed(2)}
                                      </span>
                                    </div>
                                  );
                                })}
                                <div className={styles.deone}>
                                  <div className={styles.deti}>购物车小计</div>
                                  <span className={styles.deleft}>
                                    ￥{sumPrice(item.goods)}
                                  </span>
                                </div>
                                <div className={styles.deone}>
                                  <div className={styles.deti}>运费</div>
                                  <span className={styles.deleft}>
                                    普通快递￥50.00
                                  </span>
                                </div>
                                <div className={styles.deone}>
                                  <div className={styles.deti}>订单总计</div>
                                  <span className={styles.deleft}>
                                    ￥{sumPrice(item.goods) + 50}
                                  </span>
                                </div>
                              </div>

                              <div className={styles.userDetali}>
                                <div className={styles.user}>客户详情</div>
                                <div className={styles.username}>
                                  姓名:{item?.name}
                                </div>
                                <div className={styles.username}>
                                  电话:{item?.phone}
                                </div>
                              </div>
                              <div className={styles.add}>
                                <div>账单地址</div>
                                <div className={styles.ud}>{item?.address}</div>
                                <div className={styles.ud}>{item?.name}</div>
                                <div className={styles.ud}>{item?.phone}</div>
                              </div>
                            </div>
                          ),
                        })
                      }
                    >
                      查看详情
                    </Button>
                  </div>
                </div>
              );
            })}
          </Tabs.Tab>
          <Tabs.Tab title="已取消" key="Config">
            Config
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default IndexPage;
