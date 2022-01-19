import React, { useRef } from 'react';
import { Button, Space, Swiper, Toast } from 'antd-mobile';
import styles from './index.less';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];
const items = [
  <Swiper.Item key="1">
    <div className={styles.content}>
      <img
        className={styles.imgs}
        src={require('../../assets/img/1.png')}
        alt=""
      />
    </div>
  </Swiper.Item>,
  <Swiper.Item key="2">
    <div className={styles.content}>
      <img
        className={styles.imgs}
        src={require('../../assets/img/2.png')}
        alt=""
      />
    </div>
  </Swiper.Item>,
];
const Swipers: React.FC = (props) => {
  const ref = useRef<SwiperRef>(null);
  return (
    <div>
      <Swiper loop autoplay autoplayInterval={4000}>
        {items}
      </Swiper>
    </div>
  );
};
export default Swipers;
