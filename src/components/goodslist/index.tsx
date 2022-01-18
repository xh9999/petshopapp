import React, { memo } from "react";
import { Card, Grid } from 'antd-mobile'
import styles from './index.less'
import { history } from 'umi'
type GoodsItemType = {
    id: number,
    title: string,
    price: string,
    type: string
    src1: string,
    src2: string
}
type IProps = {
    list: GoodsItemType[]
}
const GoodsList: React.FC<IProps> = (props) => {
    const goGoodsDetail = (id: number) => {
        history.push(`/goodsdetail?id=${id}`,)
    }
    return <div className="item">
        <Grid columns={2} gap={5}>
            {props.list.map((item, index) => {
                return <Grid.Item key={index}>
                    <div className={styles['grid-demo-item-block']} onClick={() => { goGoodsDetail(item.id) }}>
                        <img className={styles.img} src={item.src1} alt="" />
                        <p className={styles.title}>{item.title}</p>
                        <p className={styles.price}>{item.price}</p>
                    </div>
                </Grid.Item>
            })}
        </Grid>
    </div>
}
export default memo(GoodsList) 