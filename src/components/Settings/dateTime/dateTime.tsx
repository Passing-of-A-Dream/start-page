import * as React from 'react';
import './dateTime.scss';
import store from '@/valtio/index';
import { useSnapshot } from 'valtio';
import { Switch } from 'antd';
import { SettingsBody } from '../settings-body/settingsBody';

export interface IDateTimeProps {
}

export function DateTime(props: IDateTimeProps) {
  const snap = useSnapshot(store);
  const SwitchChoise = (checked: boolean) => {
    store.dateSeconds = checked;
  }
  return (
    <>
      <div className='settings-components-dateTime'>
        <SettingsBody title='时间/日期格式化'>
          <div className="list">
            <span className='secondes-show'>是否显示秒</span>
            <Switch checked={snap.dateSeconds} onChange={SwitchChoise} />
          </div>
        </SettingsBody>
      </div>
    </>
  );
}
