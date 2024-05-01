import React from 'react'
import { Button, Form, Input } from 'antd'

import { login } from '../../services/api'

const Header = () => {
    const onFinish = async (values: any) => {
        console.log('Success:', values)
        const user = {
            ...values,
        }
        const res = await login(user)
        // dispatch(addTask(task));
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className=''>
            header
            {/* <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="UserName"
                    name="UserName"
                    rules={[{ required: true, message: 'Please input UserName!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form> */}
        </div>
    )
}

export default Header
