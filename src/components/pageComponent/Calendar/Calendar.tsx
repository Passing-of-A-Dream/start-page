import * as React from "react"
import "./Calendar.scss"
import dayjs from "dayjs"
import { Calendar } from "antd"
import YModal from "@/components/YModal/YModal"

const YCalendar = () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <div className="page-component-calendar" onClick={()=>setVisible(true)}>
        <span style={{fontSize: "50px", color: "#fff"}}>{dayjs(new Date()).format("DD")}</span>
        <span>日期</span>
      </div>
      <YModal visible={visible} closeClick={() => setVisible(false)}>
        <Calendar />
      </YModal>
    </>
  )
}
export default YCalendar