import styles from './index.less';
import { Button, Space } from 'antd-mobile';
import { Link, history } from 'umi';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
type ParamsType = {
  id: string;
};
type IProps = {
  tuijian: string;
  getdata: any;
};

const TuiJian: FC<IProps & RouteComponentProps<ParamsType>> = (props) => {
  return JSON.parse(props.tuijian).map((item: any) => (
    <div
      key={item.id}
      className={styles.dk}
      onClick={() => {
        props.getdata(item.id);
        history.push(`/shopping?id=${item.id}`);
      }}
    >
      <div>
        <img src={item.src1} alt="" />
      </div>
      <div>
        <div>{item.title}</div>
        <div>{item.price}</div>
        <div>立即购买</div>
      </div>
    </div>
  ));
};
export default TuiJian;
