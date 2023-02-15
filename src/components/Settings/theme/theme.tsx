import * as React from 'react';
import { useSnapshot } from 'valtio';
import { SettingsBody } from '../settings-body/settingsBody';
import './theme.scss';
import store from '@/valtio/index'
import { Button, Input } from 'antd';
import { constant } from '@/utils/utils';

export interface IThemeProps {
}

export function Theme(props: IThemeProps) {
  const snap = useSnapshot(store)

  const [colorValue, setColorValue] = React.useState('#00B96B')

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorValue(e.target.value)
  }
  const themeColorChange = change

  // 提交修改
  const onSubmit = () => {
    store.themeColor = colorValue
  }
  // 重置
  const onResize = () => {
    setColorValue(constant.THEME_COLOR)
    store.themeColor = constant.THEME_COLOR
  }
  return (
    <>
      <div className='settings-components-theme'>
        <SettingsBody title='主题设置'>
          <div className="list">
            <div className="list-item">
              <span>主题颜色</span>
              <input type="color" value={colorValue} onChange={themeColorChange} />
            </div>
            {/* <div className="list-item">
              <span>背景图片</span>
              <Input size='small' placeholder='请输入链接地址' style={{ width: 200 }} />
            </div> */}
          </div>
          <div className="action">
            <Button onClick={onResize}>重置</Button>
            <Button onClick={onSubmit}>确定</Button>
          </div>
        </SettingsBody>
      </div>
    </>
  );
}
