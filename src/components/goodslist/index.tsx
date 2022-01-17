import React from "react";
import { Card, Grid } from 'antd-mobile'
import styles from './index.less'
const GoodsList: React.FC = (props) => {
    const goGoodsDetail = (id: string) => {
        console.log(123)
    }
    return <div className="item">
        <Grid columns={2} gap={5}>
            <Grid.Item >
            <div className={styles['grid-demo-item-block']} onClick={() => { goGoodsDetail('123') }}>
                    <img className={styles.img} src={require('../../assets/img/4.png')} alt="" />
                    <p className={styles.title}>顺口味 无尘豆腐猫砂6L 快速出臭结团</p>
                    <p className={styles.price}>￥123</p>
                </div>
            </Grid.Item>
            <Grid.Item>
            <div className={styles['grid-demo-item-block']} onClick={() => { goGoodsDetail('123') }}>
                    <img className={styles.img} src={require('../../assets/img/4.png')} alt="" />
                    <p className={styles.title}>顺口味 无尘豆腐猫砂6L 快速出臭结团</p>
                </div>
            </Grid.Item>
            <Grid.Item>
                <div className={styles['grid-demo-item-block']} onClick={() => { goGoodsDetail('123') }}>
                    <img className={styles.img} src={require('../../assets/img/4.png')} alt="" />
                    <p className={styles.title}>顺口味 无尘豆腐猫砂6L 快速出臭结团</p>
                </div>
            </Grid.Item>
            <Grid.Item>
            <div className={styles['grid-demo-item-block']} onClick={() => { goGoodsDetail('123') }}>
                    <img className={styles.img} src={require('../../assets/img/4.png')} alt="" />
                    <p className={styles.title}>顺口味 无尘豆腐猫砂6L 快速出臭结团</p>
                </div>
            </Grid.Item>
        </Grid>
    </div>
}
export default GoodsList