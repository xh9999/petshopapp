import React from "react";
import styles from './styles.less'
import Logincomponent from "@/components/login";
const Login = () => {
    return <div className={styles.login}>
        <img className={styles.img} src={require('../../assets/img/bg.png')} alt="" />
        <Logincomponent></Logincomponent>
    </div>
}
export default Login