import { useState } from 'react'
import { Calendar } from '@/components/datePicker'
import '@/components/datePicker/Calendar.css'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const Demo = () => {
  const [value, onChange] = useState<Value>(new Date())

  return (
    <>
      Date Picker
      <Calendar onChange={onChange} showWeekNumbers value={value} />
    </>
  )
}

export default Demo
