import * as React from 'react';
import './dateTime.scss';
import store from '@/valtio/index';
import { useSnapshot } from 'valtio';
import { Switch } from 'antd';
import { SettingsBody } from '../settings-body/settingsBody';

export interface IDateTimeProps {
}

interface DateTimeList {
  title: string
  stroeKey: string
}

export function DateTime(props: IDateTimeProps) {
  const snap = useSnapshot(store);
  // const SwitchChoise = (checked: boolean) => {
  //   store.dateSeconds = checked;
  // }
  const settingList: DateTimeList[] = [
    {
      title: '是否显示秒',
      stroeKey: 'dateSeconds'
    },
  ]
  return (
    <>
      <div className='settings-components-dateTime'>
        <SettingsBody title='时间/日期格式化'>
          {
            settingList.map((item, index) => {
              return (
                <div className='list' key={index}>
                  <span>{item.title}</span>
                  <Switch checked={snap[item.stroeKey]} onChange={(checked) => store[item.stroeKey] = checked}></Switch>
                </div>
              )
            })
          }
        </SettingsBody>
      </div>
    </>
  );
}
