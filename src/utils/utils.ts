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
