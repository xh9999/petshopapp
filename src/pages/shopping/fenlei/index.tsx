import styles from './index.less';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
type ParamsType = {
  id: string;
};
type IProps = {
  fenlei: string;
};

const TuiJian: FC<IProps & RouteComponentProps<ParamsType>> = (props) => {
  console.log(JSON.parse(props.fenlei));
  return JSON.parse(props.fenlei).map((item: string, index: number) => (
    //    console.log(item,index)
    // <div key={index}>{item}</div>
    <a className={styles.a} key={index}>
      {item}
    </a>
  ));
};
export default TuiJian;
