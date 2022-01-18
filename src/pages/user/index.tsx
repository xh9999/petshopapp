import React from "react";
import { Button, Space } from 'antd-mobile'
import { httpsGet, httpsPost } from '@/services';
const User: React.FC = (props) => {
    const layout = () => {
        httpsGet('/api/user/exit')
    }
    return <div>个人主页
        <Button color='primary' onClick={layout}>退出登录</Button>
    </div>
}
export default User