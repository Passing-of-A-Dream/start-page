export function debounce(fun: Function, delay = 1000) {
  let timer: number | undefined;
  return function (this: unknown, ...args: any) {
    clearTimeout(timer);
    setTimeout(() => {
      fun.apply(this, args)
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