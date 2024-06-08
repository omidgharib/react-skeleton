import { useState } from 'react'
import { Modal, type FormInstance } from 'antd'

import CollectionForm from './CollectionForm'
import { TTask } from '@/types/task'

interface FormModalProps {
  open: boolean
  onCreate: (values: TTask) => void // any for values
  onCancel: () => void
  initialValues: TTask
  confirmLoading: boolean
  title: string
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
  confirmLoading,
  title,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>()
  return (
    <Modal
      open={open}
      title={title}
      okText='Save'
      cancelText='Cancel'
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      confirmLoading={confirmLoading} // not worked
      destroyOnClose
      onOk={async () => {
        try {
          const values: TTask = await formInstance?.validateFields()
          formInstance?.resetFields() // need to be checked
          onCreate(values)
        } catch (error) {
          console.log('Failed:', error)
        }
      }}
    >
      <CollectionForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance)
        }}
      />
    </Modal>
  )
}

export default FormModal
