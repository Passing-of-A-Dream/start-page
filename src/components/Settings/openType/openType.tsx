import { Switch } from 'antd';
import * as React from 'react';
import { useSnapshot } from 'valtio';
import { SettingsBody } from '../settings-body/settingsBody';
import store from '@/valtio/index';
import './openType.scss'

export interface IOpenTypeProps {
}

interface OpenTypeList {
  title: string
  stroeKey: string
}

export function OpenType(props: IOpenTypeProps) {
  const snap = useSnapshot(store)

  const [outOpneList, setOutOpenList] = React.useState<OpenTypeList[]>([
    {
      title: '新标签页打开搜索结果',
      stroeKey: 'outOpenSearch'
    },
    {
      title: '新标签页打开书签',
      stroeKey: 'outOpenBookmarks'
    }
  ])

  return (
    <>
      <div className='Component-setting-opentType'>
        <SettingsBody title='打开方式'>
          {
            outOpneList.map((item, index) => {
              return (
                <div className='openType-item' key={index}>
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
