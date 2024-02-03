import { useSnapshot } from 'valtio'
import './ContextMenu.scss'
import store from "@/valtio/index"
import ReactDOM from 'react-dom'

interface IProps {
  handleClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, arg1: string) => void
}

export default function ContextMenu(props: IProps) {
  const snap = useSnapshot(store)
  let { x, y } = snap.contextMenu // 获取鼠标位置
  // 获取视口宽高
  const { innerWidth, innerHeight } = window
  // 菜单宽高
  let menuHeight = 0
  let menuWidth = 100
  const menuContent = ['设置']
  menuHeight = menuContent.length * 30
  // 判断是否超出视口
  if (x > innerWidth - menuWidth) {
    x -= (menuWidth + 10)
  }
  if (y > innerHeight - menuHeight) {
    y -= (menuHeight + 20)
  }
  const heightandwidth = (arg1:number) => {
    if (snap.contextMenu.show) {
      return arg1
    }
    return 0
  }
  const style = {
    display: snap.contextMenu.show ? "block" : "none",
    left: x,
    top: y,
    "--menu-height": heightandwidth(menuHeight) + "px",
    "--menu-width": heightandwidth(menuWidth) + "px",
  }
  // 把dom挂载到body上
  return ReactDOM.createPortal(
    <div className="context-menu" style={style}>
      <ul>
        {menuContent.map((item, index) => (<li key={item} onClick={(e) => props.handleClick(e, item)}>{item}</li>))}
      </ul>
    </div>
    , document.body)
}