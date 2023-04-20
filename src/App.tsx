import './App.scss'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Layout from './components/Layout/Layout'
import { useSnapshot } from 'valtio'
import store from "@/valtio/index"
import Index from './views/index'
import { useEffect, useState } from 'react'
import { cssVarModify, showContextMenu } from './utils/utils'
import ContextMenu from './components/ContextMenu/ContextMenu'
import { Setting } from './components/Settings/Settings'

dayjs.locale('zh-cn') // 日期显示语言

function App() {
  const snap = useSnapshot(store)
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
  if (snap.backgroundImage) {
    cssVarModify('--pagebody-backgroundImage', `url(${snap.backgroundImage})`)
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

  const contextMenuClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: string) => {
    if (item === '设置') {
      setDrawerVisible(true)
    }
  }

  return (
    <div className="Page-Entrance-App">
      <ConfigProvider theme={themeConfig} locale={zhCN}>
        <ContextMenu handleClick={contextMenuClick} />
        <Layout>
          <Index />
        </Layout>
        <Setting drawerVisible={drawerVisible} drawerOnClose={() => setDrawerVisible(false)} />
      </ConfigProvider>
    </div>
  )
}

export default App
