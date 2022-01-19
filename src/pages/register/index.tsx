import React from 'react';
import styles from './styles.less';
import Register from '../../components/register/index';
const Login = () => {
  return (
    <div className={styles.login}>
      <img
        className={styles.img}
        src={require('../../assets/img/bg.png')}
        alt=""
      />
      <Register></Register>
    </div>
  );
};
export default Login;
