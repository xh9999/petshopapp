import styles from './index.less';
import { Button, Space } from 'antd-mobile';
import { Link, history } from 'umi';
import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
type ParamsType = {
  id: string;
};
type IProps = {
  aihao: string;
  getdata: any;
};

const IndexPage: FC<IProps & RouteComponentProps<ParamsType>> = (props) => {
  const [i, seti] = useState<number>();
  return JSON.parse(props.aihao).map((item: string, index: number) => (
    <div
      key={index}
      className={i == index ? styles.index : ''}
      onClick={() => {
        seti(index);
        props.getdata(item);
      }}
    >
      {item}
    </div>
  ));
  //    <div></div>
};
export default IndexPage;
