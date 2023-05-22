import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Spin } from 'antd'

// vite环境重写console,防止生产环境打印日志
if (import.meta.env.PROD) {
  console.log('欢迎使用Y-UI')
  console.log = () => { }
  console.warn = () => { }
  console.error = () => { }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <React.Suspense fallback={<Spin />}>
        <App />
      </React.Suspense>
  </React.StrictMode>,
)
