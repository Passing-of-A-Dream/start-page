import React from 'react'
import './App.scss'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Layout from './components/Layout/Layout'
import { useSnapshot } from 'valtio'
import store from "@/valtio/index"
import Index from './views/index'
import { useEffect, useState } from 'react'
import { constant, cssVarModify, getBase64Image, showContextMenu } from './utils/utils'
const ContextMenu = React.lazy(() => import('./components/ContextMenu/ContextMenu'))
const Setting = React.lazy(() => import('./components/Settings/Settings'))

dayjs.locale('zh-cn') // 日期显示语言

function App() {
  const snap = useSnapshot(store) // 获取store数据
  const [messageApi, contextHolder] = message.useMessage() // 全局message
  // 主题设置
  const themeConfig = {
    token: {
      colorPrimary: snap.themeColor,
    }
  }
  useEffect(() => {
    if (snap.isSimpleMode) {
      cssVarModify("--layout-header-height", "35vh", true)
    } else {
      cssVarModify("--layout-header-height", "20vh", true)
    }
    () => { }
  }, [snap.isSimpleMode])

  // 设置背景图片
  if (snap.backgroundImage && !snap.bingImage && navigator.onLine) {
    store.backgroundImage = snap.backgroundImage
  } else if (snap.bingImage && navigator.onLine) {
    getBase64Image(constant.BING_IMAGE).then(res => {
      if (!res) {
        messageApi.error('网络连接失败，背景图片加载失败')
        return
      }
      store.backgroundImage = res as string
    })
  } else {
    messageApi.error('网络连接失败，背景图片加载失败')
  }

  // 修改右键菜单为自定义菜单
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    showContextMenu(e, snap, store)
  })
  document.addEventListener('click', (e) => {
    store.contextMenu.show = false
  })
  const [drawerVisible, setDrawerVisible] = useState(false)

  const MENU_MAP = {
    '设置': (value: boolean) => setDrawerVisible(value),
  } as const;

  type MenuMap = typeof MENU_MAP;

  const menuContent: (keyof MenuMap)[] = Object.keys(MENU_MAP) as (keyof MenuMap)[]

  const contextMenuClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: keyof MenuMap) => {
    MENU_MAP[item](true)
  }

  return (
    <div className="Page-Entrance-App">
      <div className="background-image">
        <img src={snap.backgroundImage} alt="" />
      </div>
      <ConfigProvider theme={themeConfig} locale={zhCN}>
        <ContextMenu handleClick={(e, arg1) => contextMenuClick(e, arg1 as keyof MenuMap)} menuContent={menuContent} />
        <Layout>
          <Index />
        </Layout>
        <Setting drawerVisible={drawerVisible} drawerOnClose={() => setDrawerVisible(false)} />
      </ConfigProvider>
    </div>
  )
}

export default App
