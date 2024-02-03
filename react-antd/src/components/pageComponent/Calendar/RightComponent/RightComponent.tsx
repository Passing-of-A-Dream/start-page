import dayjs from 'dayjs'
import './RightComponent.scss'
import { getWeek } from '@/utils/utils'
import React from 'react'
import { IndexedDB } from '@/utils/indexdb'
import { Button } from 'antd'
interface IProps {
  selectDate: string
  db: IndexedDB
}

export default function RightComponent(props: IProps) {
  const { selectDate, db } = props
  console.log('%c [ selectDate ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', selectDate)
  const [data, setData] = React.useState<any[]>([])
  React.useEffect(() => {
    db.get("ycalendar", selectDate).then((res) => {
      console.log('%c [ res ]-16', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      setData(res.data)
    }).catch((err) => {
      console.log("表内没有该key");
    })
  }, [selectDate])
  return (
    <>
      <div className='RightComponent' ycaledar-right=''>
        <div className='content'>
          <div className='title'>
            {dayjs(selectDate).format('YYYY年MM月DD日') + ' ' + getWeek(selectDate)}
          </div>
          <div className='list'>
            {data?.length > 1 ? data?.map((item, index) => {
              return (
                <div className='item' key={index}>
                  <div className='time'>{item.time}</div>
                  <div className='content'>{item.content}</div>
                </div>
              )
            }) : <div className='no-data'>今日无事</div>}
          </div>
          <div className="button">
            <Button>添加事件</Button>
          </div>
        </div>
      </div>
    </>
  )
}