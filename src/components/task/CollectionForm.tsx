import { useEffect } from 'react'
import { Form, Input, Select, type FormInstance } from 'antd'
import { TTask } from '@/types/task'

interface CollectionFormProps {
  initialValues: TTask // any for values
  onFormInstanceReady: (instance: FormInstance<TTask>) => void
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  initialValues,
  onFormInstanceReady,
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    onFormInstanceReady(form)
  }, [])
  return (
    <Form
      name='basic'
      layout='vertical'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      form={form}
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
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Type'
        name='type'
        rules={[{ required: true, message: 'Please select your type!' }]}
      >
        <Select
          defaultValue='daily'
          style={{ width: 120 }}
          // onChange={handleChange}
          options={[
            { value: 'daily', label: 'daily' },
            { value: 'weekly', label: 'weekly' },
            { value: 'monthly', label: 'monthly' },
            // { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>
      <Form.Item
        label='Target'
        name='target'
        rules={[{ required: true, message: 'Please input your target!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default CollectionForm
