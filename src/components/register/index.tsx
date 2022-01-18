import {
    Form,
    Input,
    Button,
    Toast
} from 'antd-mobile'
import React, { useState } from 'react'
import styles from './styles.less'
import CryptoJS from 'crypto-js'
import { history } from 'umi'
import { httpsGet, httpsPost } from '@/services';
const Register: React.FC = (props) => {
    const [phoneValue, setPhoneValue] = useState('')
    const [nickValue, setnickValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmpasswordValue, setconfirmpasswordValue] = useState('')
    const getPhone = (phone: string) => {
        setPhoneValue(phone)
    }
    const getPassword = (password: string) => {
        setPasswordValue(password)
    }
    const confirmPassword = (password: string) => {
        setconfirmpasswordValue(password)
    }
    const getNickname = (nickname: string) => {
        setnickValue(nickname)
    }
    // 注册
    const register = () => {
        //向服务发送注册请求
        httpsPost('/api/user/register', {
            phone: phoneValue,
            nickname: nickValue,
            password: CryptoJS.MD5(passwordValue).toString(),
            no: Math.random().toString().slice(3, 9)
        }).then((data) => {
            if (data.code == -1) {
                Toast.show({
                    icon: 'fail',
                    content: '该手机号已经被注册',
                })
            } else {
                Toast.show({
                    icon: 'success',
                    content: '注册成功',
                    afterClose: () => { return history.push('/login') }
                })
            }
        })
    }
    // 登录
    const goLogin = () => {
        history.push('/login')
    }
    // 表单验证
    const checkName = (rule: any, value: any, cb: any) => {
        return new Promise((resolve, reject) => {
            if (value !== passwordValue) {
                reject('两次密码不一致')
            } else {
                resolve('')
            }
        })
    }
    return <div className={styles.container}>
        <h2 className={styles.title}>商城注册</h2>
        <Form className={styles.form}
            onFinish={register}
            footer={
                <>
                    <Button block color='primary' size='large' onClick={goLogin}>
                        登录
                    </Button>
                    <Button color='primary' type='submit' className={styles.register} block size='large' >
                        注册
                    </Button>
                </>
            }
        >
            <Form.Item
                className={styles.item}
                name='nickname'
                label='昵称'
                rules={[{ required: true, message: '昵称不能为空' }]}
            >
                <Input placeholder='昵称' className={styles.input} value={nickValue} onChange={(nickname) => { getNickname(nickname) }} />
            </Form.Item>
            <Form.Item
                className={styles.item}
                name='phone'
                label='手机号'
                rules={[{ required: true, message: '手机号不能为空' }]}
            >
                <Input placeholder='请输入手机号' className={styles.input} value={phoneValue} onChange={(phone) => { getPhone(phone) }} />
            </Form.Item>
            <Form.Item name='password' label='密码'
                className={styles.item}
                rules={[{ required: true, message: '密码不能为空' }]}>
                <Input placeholder='请输入密码' className={styles.input} type='password' value={passwordValue} onChange={(password) => { getPassword(password) }} />
            </Form.Item>
            <Form.Item name='confirmpassword' label='请确认密码'
                className={styles.item}
                rules={[{ required: true, message: '密码不能为空' },
                { validator: (rule, value, cb) => checkName(rule, value, cb) }
                ]}>
                <Input placeholder='请在输入一次密码' className={styles.input} type='password' value={confirmpasswordValue} onChange={(password) => { confirmPassword(password) }} />
            </Form.Item>
        </Form>
    </div>
}
export default Register