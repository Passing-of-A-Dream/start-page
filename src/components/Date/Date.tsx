import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import './Date.scss'
import store from '@/valtio/index'
import dayjs from 'dayjs';
// import { subscribeKey } from 'valtio/utils';

export interface IDateProps {
  color?: string;
}

interface IDateParams {
  format: "H:mm:ss" | "H:mm";
  updateInterval: number;
}

export default function YDate(props: IDateProps) {
  const snap = useSnapshot(store);
  const [date, setDate] = useState(new Date());

  const timeRef = useRef<any>(null)

  useEffect(() => {
    setDate(new Date())
    if (timeRef.current) {
      clearInterval(timeRef.current)
      timeRef.current = undefined
    }
    const timeUpdate = setInterval(() => {
      setDate(new Date())
    }, snap.dateSeconds ? 1000 : 6000)
    // 把定时器的返回值赋值给timeRef.current
    timeRef.current = timeUpdate

    return () => {
      if (timeUpdate) {
        clearInterval(timeRef.current)
      }
    }
  }, [snap.dateSeconds])
  return (
    <div className='Components-YDate'>
      <div className='Date' style={{ color: props.color || '#f2f2f2' }}>
        <span className='H'>{dayjs(date).format("H")}</span>
        <span>:</span>
        <span className='M'>{dayjs(date).format("mm")}</span>
        <span style={{ display: !snap.dateSeconds ? 'none' : 'block' }}>:</span>
        {snap.dateSeconds && <span className='S'>{dayjs(date).format("ss")}</span>}
      </div>
    </div>
  );
}
