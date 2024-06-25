import { useCallback, useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/actions/addTask'
import FormModal from './FormModal'
import { TTask } from '@/types/task'
import taskApi from '@/services/taskApi'

const CreateForm = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [create] = taskApi.useCreateMutation()

  const onFinish = (values: TTask) => {
    console.log('Success:', values)
    const task: TTask = {
      ...values,
      id: Date.now().toString(), // need to be id
    }
    // const result = await create(task);
    // if (result) {
    //   dispatch(addTask(result));
    //   // navigate("/");
    // }
    doCreate(task).then()
    setTimeout(() => {
      // dispatch(addTask(task))
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const doCreate = useCallback(
    async (task: TTask) => {
      try {
        const result = await create(task)
        if (result) {
          dispatch(addTask(result))
          // navigate("/");
        }
      } catch (err: unknown) {
        console.error('login error: ', err)
        // notifyApi.error({ message: err.message || err });
      }
    },
    [create, dispatch]
  )

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
