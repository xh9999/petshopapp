import React from 'react';
import styles from './index.less';
type nameType = {
  name: string;
  ename: string;
};
const Classify: React.FC<nameType> = (props) => {
  return (
    <div className={styles.classify}>
      <span className={styles.diver}></span>
      <div className={styles.title}>
        {props.name}
        <div className={styles.dog}>{props.ename}</div>
      </div>
      <span className={styles.diver}></span>
    </div>
  );
};
export default Classify;
