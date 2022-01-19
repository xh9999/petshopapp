import styles from './index.less';
import { Button, Space } from 'antd-mobile';
import { Link, history } from 'umi';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
type ParamsType = {
  id: string;
};
type IProps = {
  aihao: string;
  getdata: any;
};

const IndexPage: FC<IProps & RouteComponentProps<ParamsType>> = (props) => {
  return JSON.parse(props.aihao).map((item: string, index: number) => (
    <div
      key={index}
      onClick={() => {
        props.getdata(item);
      }}
    >
      {item}
    </div>
  ));
  //    <div></div>
};
export default IndexPage;
