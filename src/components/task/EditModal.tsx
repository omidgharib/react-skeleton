import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTasks } from '../../redux/actions/updateTasks'
import FormModal from './FormModal'
import { ITask } from '@/interfaces/ITask'

interface EditModalProps {
    onClose: () => void // any for values
    data: ITask
}

const initialValues = { type: 'daily' }

const EditModal = ({ onClose, data }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const tasksData = useSelector((state: ITask[]) => {
        return state
    })
    const tasks = tasksData?.task

    // update entity
    const onFinish = (values: any) => {
        console.log('Success:', values)
        let tasksClone = structuredClone(tasks)
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

    const showModal = () => {
        setOpen(true)
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
                initialValues={{ ...initialValues, ...data }}
                confirmLoading={confirmLoading}
            />
        </>
    )
}

export default EditModal
