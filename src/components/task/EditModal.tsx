import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTasks } from '../../redux/actions/updateTasks'
import FormModal from './FormModal'
import { TTask } from '@/types/task'
import { RootState } from '@/redux/stores/store'

interface EditModalProps {
  onClose: () => void // any for values
  data: TTask
}

const initialValues = { type: 'daily' }

const EditModal = ({ onClose, data }: EditModalProps) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const tasks: TTask[] = useSelector((state: RootState) => state.task)

  // update entity
  const onFinish = (values: TTask) => {
    console.log('Success:', values)
    const tasksClone = structuredClone(tasks)
    const objIndex = tasksClone.findIndex((obj) => obj.key === data?.key)

    tasksClone[objIndex] = {
      ...data,
      ...values,
    }
    setTimeout(() => {
      dispatch(updateTasks(tasksClone)) // need to be update
      setOpen(false)
      setConfirmLoading(false)
      onClose && onClose()
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
    onClose && onClose()
  }

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
                Add New Task
            </Button> */}
      <FormModal
        open={open}
        onCreate={onFinish}
        title='Update task'
        // onFinishFailed={onFinishFailed}
        onCancel={handleCancel}
        initialValues={{ ...initialValues, ...data } as TTask}
        confirmLoading={confirmLoading}
      />
    </>
  )
}

export default EditModal
