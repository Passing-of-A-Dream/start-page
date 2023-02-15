import { useState } from 'react';
import { Setting } from '../Settings/Settings';
import './SideBar.scss'

export interface ISideBarProps {
}
interface IRouteLink {
  name: string
  path: string
}

export function SideBar(props: ISideBarProps) {
  /**
   * 侧边栏路由
   */
  const [routeLink, setRouteLink] = useState<IRouteLink[]>([
    {
      name: '书签',
      path: 'index'
    },
    {
      name: '设置',
      path: 'setting'
    }
  ])
  // 选中的tab
  const [tabSelected, setTabSelected] = useState<string>('index')
  // 抽屉是否显示
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const drawerOnClose = () => {
    setDrawerVisible(false)
    setTabSelected('index')
  }
  // 点击tab
  const handleTabClick = (path: string) => {
    if (path === 'setting') {
      setDrawerVisible(true)
    }
    setTabSelected(path)
  }
  return (
    <div className='Components-SideBar'>
      {routeLink.map((com, index) => (
        <div key={index} className={(tabSelected === com.path ? 'side-bar-item-selected' : '') + ' side-bar-item'} onClick={()=>handleTabClick(com.path)}>
          <span>{com.name}</span>
        </div>
      ))}
      <Setting drawerVisible={drawerVisible} drawerOnClose={drawerOnClose} />
    </div>
  );
}
