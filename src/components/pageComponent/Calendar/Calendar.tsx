import * as React from "react"
import "./Calendar.scss"
import dayjs from "dayjs"
import { Calendar, theme } from "antd"
const YModal = React.lazy(() => import("@/components/YModal/YModal"))
import RightComponent from "./RightComponent/RightComponent"
import { IndexedDB } from "@/utils/indexdb"

const YCalendar = () => {
  const [visible, setVisible] = React.useState(false)
  const { token } = theme.useToken()
  const [selectDate, setSelectDate] = React.useState(dayjs(new Date()).format("YYYY-MM-DD"))
  const [db, setDb] = React.useState<IndexedDB>()
  const [table, setTable] = React.useState<IDBObjectStore>()
  // 初始化indexdb
  React.useEffect(() => {
    const indexdb = new IndexedDB("ycalendar", 1, [{
      name: 'ycalendar',
      keyPath: 'date',
      autoIncrement: true,
      indexes: [{ name: 'ycalendar', keyPath: 'date', unique: true }],
    }])
    indexdb.open()
      .then((db) => {
        // console.log('%c [ db ]-25', 'font-size:13px; background:pink; color:#bf2c9f;', db)
        // console.log("数据库打开成功")
        indexdb.put("ycalendar", { date: selectDate, data: [] }).then((res) => {
          // console.log("成功");
        })
        setDb(indexdb)
      })
  }, [])

  const style = {
    width: "100%",
    height: "100%",
    "--select-text-color": token.colorPrimary,
    "--select-background-color": token.controlItemBgActive,
  }
  // 打开日历
  const yCalendarClick = async () => {
    setVisible(true)
  }

  return (
    <>
      <div className="page-component-calendar" onClick={yCalendarClick}>
        <span style={{ fontSize: "50px", color: "#fff" }}>{dayjs(new Date()).format("DD")}</span>
        <span>日期</span>
      </div>
      <YModal visible={visible} closeClick={() => setVisible(false)} className="y-calendar">
        <div className="y-calendar-content">
          <div className="left" style={style}>
            <Calendar
              fullscreen={false}
              style={{ height: '100%', borderRadius: "10px", padding: "0 10px" }}
              onSelect={(date) => {
                setSelectDate(dayjs(date).format("YYYY-MM-DD"))
              }}
            />
          </div>
          <div className="right">
            <RightComponent db={db!} selectDate={selectDate} />
          </div>
        </div>
      </YModal>
    </>
  )
}
export default YCalendar
