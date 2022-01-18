import {
    Form,
    Input,
    Button,
    Dialog,
    TextArea,
    DatePicker,
    Selector,
    Slider,
    Stepper,
} from 'antd-mobile'
import React, { useState } from 'react'
import styles from './styles.less'
import CryptoJS from 'crypto-js'
import { history } from 'umi'
import { httpsGet, httpsPost } from '@/services';
const Logincomponent: React.FC = (props) => {
    const [phoneValue, setPhoneValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const getPhone = (phone: string) => {
        setPhoneValue(phone)
    }
    const getPassword = (password: string) => {
        setPasswordValue(password)
    }
    // 当密码不为空时候才触发这个事件
    const onFinish = () => {
        // 发送登录请求
        httpsPost('/api/user/login', { phone: phoneValue, password: CryptoJS.MD5(passwordValue).toString() }).then((data) => {
            if (data.code == 0) {
                history.push('/')
            }
        })
    }
    // 注册
    const register = () => {
        history.push('/register')
    }
    return <div className={styles.container}>
        <h2 className={styles.title}>商城登录</h2>
        <Form className={styles.form}
            onFinish={onFinish}
            footer={
                <>
                    <Button block type='submit' color='primary' size='large' >
                        登录
                    </Button>
                    <Button color='primary' className={styles.register} block size='large' onClick={register} >
                        注册
                    </Button>
                </>
            }
        >
            <Form.Item
                className={styles.item}
                name='phone'
                label='手机号'
                rules={[{ required: true, message: '手机号不能为空' }]}
            >
                <Input placeholder='请输入手机号' className={styles.input} value={phoneValue} onChange={(phone) => { getPhone(phone) }} />
            </Form.Item>
            <Form.Item name='address' label='密码'
                className={styles.item}
                rules={[{ required: true, message: '密码不能为空' }]}>
                <Input placeholder='请输入密码' className={styles.input} type='password' value={passwordValue} onChange={(password) => { getPassword(password) }} />
            </Form.Item>
        </Form>
    </div>
}
export default Logincomponent