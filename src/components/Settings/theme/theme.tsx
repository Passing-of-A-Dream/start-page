import * as React from 'react';
import { useSnapshot } from 'valtio';
import { SettingsBody } from '../settings-body/settingsBody';
import './theme.scss';
import store from '@/valtio/index'
import { Button, Input, Switch, message } from 'antd';
import { constant, getBase64Image } from '@/utils/utils';

export interface IThemeProps {
}

export function Theme(props: IThemeProps) {
  const snap = useSnapshot(store)

  // message
  const [messageApi, contextHolder] = message.useMessage()

  // 主题颜色修改
  const [colorValue, setColorValue] = React.useState('#00B96B')
  // 背景图片
  const [backgroundImage, setBackgroundImage] = React.useState('')
  // 背景图片base64
  const [backgroundImageBase64, setBackgroundImageBase64] = React.useState("")

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorValue(e.target.value)
  }
  const themeColorChange = change

  // 提交修改
  const onSubmit = () => {
    store.themeColor = colorValue
    // 校验图片地址是否合法
    if (backgroundImage) {
      const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
      if (!reg.test(backgroundImage)) {
        messageApi.error('请输入正确的图片地址')
        return
      }
      getBase64Image(backgroundImage).then(res => {
        if (!res) {
          messageApi.error('请输入正确的图片地址')
          return
        }
        setBackgroundImageBase64(res as string)
        store.backgroundImage = backgroundImageBase64
        backgroundImage && messageApi.success('背景图片设置成功')
      })
        .finally(() => {
          setBackgroundImage('')
        })
    }
  }
  // 重置
  const onResize = () => {
    setColorValue(constant.THEME_COLOR)
    store.themeColor = constant.THEME_COLOR
  }
  // 每日bing图
  const imageChange = (checked: boolean) => {
    store.bingImage = checked
    setTimeout(() => {
      if (checked) {
        getBase64Image(constant.BING_IMAGE).then(res => {
          if (!res) {
            messageApi.error('网络连接失败，背景图片加载失败')
            return
          }
          setBackgroundImageBase64(res as string)
          store.backgroundImage = constant.BING_IMAGE
          backgroundImage && messageApi.success('背景图片设置成功')
        })
        messageApi.success('每日bing图设置成功')
      } else {
        store.backgroundImage = ''
        messageApi.success('每日bing图取消成功')
      }
    }, 300)
  }
  return (
    <>
      <div className='settings-components-theme'>
        {contextHolder}
        <SettingsBody title='主题设置'>
          <div className="list">
            <div className="list-item">
              <span>主题颜色</span>
              <input type="color" value={colorValue} onChange={themeColorChange} />
            </div>
            <div className="list-item" style={{ height: 30 }}>
              <span>背景图片</span>
              <Input size='small'
                placeholder='请输入链接地址'
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
                style={{ width: 200, height: 30 }} allowClear
              />
            </div>
            <div className="list-item" style={{ height: 30 }}>
              <span>每日bing图</span>
              <Switch checked={snap.bingImage} onChange={(checked) => imageChange(checked)}></Switch>
            </div>
            <div className="list-item" style={{ height: 30 }}>
              <span>背景模糊</span>
              <Switch checked={snap.backImageBlur} onChange={(checked) => store.backImageBlur = checked}></Switch>
            </div>
            <div className="list-item">
              <span>是否开启简洁模式</span>
              <Switch checked={snap.isSimpleMode} onChange={(checked) => store.isSimpleMode = checked}></Switch>
            </div>
            <div className="list-item">
              <span>一言是否点击切换</span>
              <Switch checked={snap.oneLanguage} onChange={(checked) => store.oneLanguage = checked}></Switch>
            </div>
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
