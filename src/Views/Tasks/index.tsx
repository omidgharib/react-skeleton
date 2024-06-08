import { useEffect, useState, useRef } from 'react'
import { Button, Input, Space, Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import type { InputRef } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { updateTasks } from '../../redux/actions/updateTasks'
import { ITask } from '../../types/ITask'
import TaskForm from './Form'

type DataIndex = keyof ITask
const Tasks = () => {
  const tasksData = useSelector((state: ITask[]) => {
    return state
  })
  const dispatch = useDispatch()

  const [tasks, setTasks] = useState(tasksData)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  useEffect(() => {
    setTasks(tasksData)
  }, [tasksData])

  const changeStatus = (record: ITask) => {
    const newData = [...tasks]
    newData.find((item) => item.key === record?.key).completed =
      !record?.completed
    dispatch(updateTasks(newData))
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ITask> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns: ColumnsType<ITask> = [
    {
      title: 'title',
      dataIndex: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'description',
      dataIndex: 'description',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'completed',
      dataIndex: 'completed',
      render: (value) => <span>{value ? 'done' : 'undone'}</span>,
      filters: [
        {
          text: 'done',
          value: true,
        },
        {
          text: 'undone',
          value: false,
        },
      ],
      onFilter: (value: boolean, record) => record.completed === value,
    },
    {
      title: 'Mark As Done',
      key: 'action',
      render: (_, record) => (
        <a onClick={() => changeStatus(record)}>
          {record?.completed ? 'undone' : 'done'}
        </a>
      ),
    },
  ]

  return (
    <>
      <TaskForm />
      <Table columns={columns} dataSource={tasks} />
    </>
  )
}

export default Tasks
