import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Space, Badge, TabBar } from 'antd-mobile'
import Swipers from '@/components/swiper';
import GoodsList from '@/components/goodslist';
import { httpsGet, httpsPost } from '@/services';
export default function IndexPage() {
  useEffect(() => {
    httpsGet('/api/test/goods?id=1').then((data) => {
      console.log(data)
    })
  }, [])
  return (
    <div>
      <Swipers></Swipers>
      <GoodsList></GoodsList>
    </div>
  );
}
