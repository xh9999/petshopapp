import React, { useState } from 'react'
import { Button, Space, Badge, TabBar, NavBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
    AppstoreOutline,
    CollectMoneyOutline
} from 'antd-mobile-icons'
import styles from './index.css'
const BasicLayout: React.FC = (props) => {
    const [activeKey, setActiveKey] = useState('home')
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppstoreOutline />,
        },
        {
            key: 'shop',
            title: '购物车',
            icon: <UnorderedListOutline />,
        },
        {
            key: 'orderDetail',
            title: '订单详情',
            icon: <CollectMoneyOutline />,
        },
        {
            key: 'personalCenter',
            title: '个人中心',
            icon: <UserOutline />,
        },
    ]
    return <div>
        <NavBar className={styles.navbar}>首页</NavBar>
        <div className={styles.container}>{props.children}</div>
        <TabBar className={styles.tabBar}>
            {tabs.map(item => (
                <TabBar.Item
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                />
            ))}
        </TabBar>
    </div>
}
export default BasicLayout