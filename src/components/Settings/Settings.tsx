import { Drawer, Menu } from 'antd';
import { useState } from 'react';
import { DateTime } from './dateTime/dateTime';
import { OpenType } from './openType/openType';
import "./Settings.scss"
import { Theme } from './theme/theme';
export interface ISettingProps {
  drawerVisible: boolean
  drawerOnClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

export function Setting(props: ISettingProps) {
  // 抽屉菜单，设置选项
  const drawerMenu = [
    {
      label: '搜索',
      key: 'openType',
    },
    {
      label: '主题',
      key: 'theme',
    },
    {
      label: '时间/日期',
      key: 'timeFormat',
    }
  ]
  // 当前设置
  const [currentSetting, setCurrentSetting] = useState<string>('openType')
  // 点击设置
  const handleSettingClick = (key: any) => {
    setCurrentSetting(key)
  }
  // 当前设置
  const currentSettingDom = (key: string) => {
    switch (key) {
      case 'openType':
        return <OpenType />
      case 'theme':
        return <Theme />
      case 'timeFormat':
        return <DateTime />
    }
  }
  return (
    <>
      <Drawer title="设置" width={500} bodyStyle={{ padding: 0 }} headerStyle={{ borderBottom: 'none' }} onClose={props.drawerOnClose} open={props.drawerVisible}>
        <div className='Components-settings'>
          <div className="menu">
            <Menu
              style={{ width: 130, borderInlineEnd: 'none' }}
              defaultSelectedKeys={['openType']}
              mode="inline"
              items={drawerMenu}
              onClick={({ key }) => handleSettingClick(key)}
            />
          </div>
          <div className='current-setting'>
            {currentSettingDom(currentSetting)}
          </div>
        </div>
      </Drawer>
    </>
  );
}
