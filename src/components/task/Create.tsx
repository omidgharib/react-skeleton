import { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/actions/addTask'
import FormModal from './FormModal'
import { TTask } from '@/types/task'

const CreateForm = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const onFinish = (values: TTask) => {
    console.log('Success:', values)
    const task: TTask = {
      ...values,
      key: Date.now().toString(), // need to be id
    }
    setTimeout(() => {
      dispatch(addTask(task))
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Add New Task
      </Button>
      <FormModal
        open={open}
        onCreate={onFinish}
        title='Create a new task'
        // onFinishFailed={onFinishFailed}
        onCancel={handleCancel}
        initialValues={{ type: 'daily' } as TTask}
        confirmLoading={confirmLoading}
      />
    </>
  )
}

export default CreateForm
