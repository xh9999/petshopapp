import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Space, Badge, TabBar } from 'antd-mobile';
import Swipers from '../components/swiper/index';
import GoodsList from '../components/goodslist';
import { httpsGet, httpsPost } from '@/services';
import Classify from '../components/classify';
type goodsType = {
  id: number;
  title: string;
  price: string;
  type: string;
  src1: string;
  src2: string;
};

type UserInfoType = {
  address: object;
  nickname: string;
  no: string;
  phone: number;
  photo: string;
};
export default function IndexPage() {
  let [dogGoodsList, setDogGoodsList] = useState<goodsType[]>();
  let [catGoodsList, setCatGoodsList] = useState<goodsType[]>();
  useEffect(() => {
    // http://110.42.190.78:8888/api/test/test
    httpsGet('/api/test/test').then((data) => {
      let catArray: goodsType[] = [];
      let dogArray: goodsType[] = [];
      data.test.forEach((item: goodsType) => {
        if (item.type == 'cat') {
          catArray.push(item);
        } else {
          dogArray.push(item);
        }
      });
      setDogGoodsList(dogArray);
      setCatGoodsList(catArray);
    });
    return () => {
      setDogGoodsList = () => {};
      setCatGoodsList = () => {};
    };
  }, []);
  return (
    <div>
      <Swipers></Swipers>
      <Classify name="狗狗专区" ename="DOG"></Classify>
      {dogGoodsList ? <GoodsList list={dogGoodsList}></GoodsList> : null}
      <img
        className={styles.img}
        src={require('../assets/img/123.png')}
        alt=""
      />
      <Classify name="猫咪专区" ename="CAT"></Classify>
      {catGoodsList ? <GoodsList list={catGoodsList}></GoodsList> : null}
      <img
        className={styles.img}
        src={require('../assets/img/456.png')}
        alt=""
      />
    </div>
  );
}
