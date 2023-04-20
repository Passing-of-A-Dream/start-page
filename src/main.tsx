import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Spin } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <React.Suspense fallback={<Spin />}>
        <App />
      </React.Suspense>
  </React.StrictMode>,
)
