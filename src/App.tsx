import './App.scss'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import Layout from './components/Layout/Layout'
import { useSnapshot } from 'valtio'
import store from "@/valtio/index"
import Index from './views/index'

dayjs.locale('zh-cn') // 日期显示语言

function App() {
  const snap = useSnapshot(store)
  // 主题设置
  const themeConfig = {
    token: {
      colorPrimary: snap.themeColor,
    }
  }

  return (
    <div className="Page-Entrance-App">
      <ConfigProvider theme={themeConfig} locale={zhCN}>
        <Layout>
          <Index />
        </Layout>
      </ConfigProvider>
    </div>
  )
}

export default App
