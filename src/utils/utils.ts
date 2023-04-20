// 实现一个防抖函数，并且抛出去
export function debounce(fn: Function, delay: number = 1000): Function {
  let timer: any = null
  return function (this: any) {
    let context = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
      fn()
      timer = null
    }, delay)
  }
}

// 常量存储
interface Constant {
  THEME_COLOR: string
}
/**
 * 常量
 * @type {Constant}
 * @constant
 * @default
 * @example THEME_COLOR 主题颜色
 */
export const constant: Constant = {
  // 颜色
  THEME_COLOR: '#00B96B',
}

/**
 * @param obj 需要转换为url字符串的对象
 * @returns url字符串
 */
export function ObjectToUrl(obj: { [key: string]: any }) {
  let str = ''
  for (let key in obj) {
    str += `${key}=${obj[key]}&`
  }
  return str
}

/**
 * @Passing-of-A-Dream
 * @param variable css变量
 * @param value 需要修改的值
 * @param isEven 是否平滑滚动
 * @param timer 动画时间 单位ms
 * @param fn 自定义动画函数 将会返回上述值
 */
export const cssVarModify = (variable: string, value: string, isEven: boolean=true, timer: number = 260, fn?: (obj: Object) => void) => {
  let style = document.documentElement.style.getPropertyValue(variable)
  const obj = {
    styleValue: style,
    value,
    isEven,
    timer
  }
  if (fn) {
    fn(obj);
    return;
  }
  const r = RegExp(/[^\d.]/g)
  if (isEven && r.test(style)) {
    let num = Number(style.replace(r, ""))
    let num2 = Number(value.replace(r, ""))
    let abs = Math.abs(num - num2) * 10
    let animationTime = (timer / 1) / abs
    if (num > num2) {
      for (let i = 0; i < abs; i++) {
        setTimeout(() => {
          document.documentElement.style.setProperty(variable, (num -= 0.1) + "vh")
        }, i * animationTime)
      }
    } else {
      for (let i = 0; i < abs; i++) {
        setTimeout(() => {
          document.documentElement.style.setProperty(variable, (num += 0.1) + "vh")
        }, i * animationTime)
      }
    }
  } else {
    document.documentElement.style.setProperty(variable, value)
  }
}
export function showContextMenu(e: MouseEvent, snap: any, store: any) {
  const target = e.target as HTMLElement
  // 如果点击的不是class为time, start-page-body-index, footer的元素，不显示右键菜单
  const className = ['time', 'start-page-body-index', 'footer', 'section-of-body']
  const targetClassName = target.classList[0] as string
  if (!className.includes(targetClassName)) {
    return null
  }
  // 如果模态框显示，不显示右键菜单
  if (snap.modalShow) {
    return null
  } else {
    if (snap.contextMenu.show) {
      store.contextMenu.show = false
    }
    store.contextMenu.show = true
    store.contextMenu.x = e.clientX
    store.contextMenu.y = e.clientY
  }
}
