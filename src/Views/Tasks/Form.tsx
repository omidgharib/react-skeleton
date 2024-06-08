import { Button, Form, Input } from 'antd'
import { ValidateErrorEntity } from 'antd/lib/form/interface'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/actions/addTask'
import { TTask } from '@/types/task'

const TaskForm = () => {
  const dispatch = useDispatch()

  const onFinish = (values: TTask) => {
    console.log('Success:', values)
    const task = {
      ...values,
      key: Date.now().toString(),
      completed: false,
    }
    dispatch(addTask(task))
  }

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Add New Task
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default TaskForm
