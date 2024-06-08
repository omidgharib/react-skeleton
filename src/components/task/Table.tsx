import { Table, Typography } from 'antd'
import { TTask } from '@/types/task'
import { ColumnsType } from 'antd/es/table'
// import TaskForm from "./Form";
const { Text } = Typography
type TileProps = {
  columns: ColumnsType<TTask>
  data: TTask[]
}
const TableTasks = (props: TileProps) => {
  const { columns, data } = props

  const calcColumnChecked = (key: string) => {
    // add to utils
    let count = 0
    data.forEach((item) => {
      item[key]?.checked && count++
    })
    return count
  }

  const calcColumn = (key: string) => {
    // add to utils
    let count = 0
    data.forEach((item) => {
      count += +item?.[key] || 0
    })
    return count
  }

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 2800, y: '100%' }}
        virtual
        summary={() => {
          let total = 0

          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text>مجموع</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                {columns.map((item, index) => {
                  const { dataIndex } = item
                  let columnTotal = 0
                  if (dataIndex?.includes('date')) {
                    // const key = dataIndex.split("_")?.[1];
                    columnTotal = calcColumnChecked(dataIndex)
                    total += columnTotal
                    return (
                      <Table.Summary.Cell key={index} index={index + 2}>
                        {columnTotal}
                      </Table.Summary.Cell>
                    )
                  } else if (dataIndex.includes('target')) {
                    return (
                      <Table.Summary.Cell
                        key={index}
                        index={columns.length - 3}
                      >
                        {calcColumn('target')}
                      </Table.Summary.Cell>
                    )
                  } else if (dataIndex.includes('total')) {
                    return (
                      <Table.Summary.Cell
                        key={index}
                        index={columns.length - 2}
                      >
                        {total}
                      </Table.Summary.Cell>
                    )
                  }
                })}
                <Table.Summary.Cell
                  index={columns.length - 1}
                ></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )
        }}
      />
    </>
  )
}

export default TableTasks
