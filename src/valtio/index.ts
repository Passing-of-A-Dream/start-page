import { constant } from "@/utils/utils";
import { proxy } from "valtio";
import { subscribeKey, watch } from 'valtio/utils'

type ILocalStorage = (str: string, type: string) => { booleanVal: boolean, strValue: string, is: boolean }
// 判断传入的字符串是否是本地存储的
const isLocalStorage: ILocalStorage = (str, type) => {
  const val = localStorage.getItem(str)
  if (val) {
    if (type === 'boolean') {
      const booleanVal = JSON.parse(val)
      return { booleanVal, strValue: val, is: true }
    }
    return { booleanVal: false, strValue: val, is: true }
  }
  return { booleanVal: false, strValue: '', is: false }
}

const LocalStorageSetItem = (key: string, value: string) => {
  if (isLocalStorage(value, 'string').is) {
    // 如果存在判断是否相同
    if (isLocalStorage(value, 'string').strValue !== String(value)) {
      localStorage.setItem(key, value)
    }
    return false
  }
  localStorage.setItem(key, value)
}

type State = {
  dateSeconds: boolean,
  themeColor: string,
  outOpenSearch: boolean,
  outOpenBookmarks: boolean,
  searchRadius: number,
  fuckCSDN: boolean,
  [key: string]: any
};

const state = proxy<State>({
  dateSeconds: isLocalStorage('dateSeconds', 'boolean').booleanVal, // 是否显示秒
  themeColor: constant.THEME_COLOR, // 主题颜色
  outOpenSearch: isLocalStorage('outOpenSearch', 'boolean').booleanVal, // 是否在新标签页打开搜索结果
  outOpenBookmarks: isLocalStorage('outOpenBookmarks', 'boolean').booleanVal, // 是否在新标签页打开书签
  searchRadius: Number(isLocalStorage('searchRadius', 'string').strValue), // 搜索框圆角
  fuckCSDN: isLocalStorage('fuckcsdn', 'boolean').booleanVal, // 搜索结果是否屏蔽CSDN
})
// 是否显示秒
subscribeKey(state, 'dateSeconds', (value) => {
  localStorage.setItem('dateSeconds', JSON.stringify(value))
})
// 是否在新标签页打开
subscribeKey(state, 'outOpenSearch', (value) => {
  localStorage.setItem('outOpenSearch', JSON.stringify(value))
})
subscribeKey(state, 'outOpenBookmarks', (value) => {
  localStorage.setItem('outOpenBookmarks', JSON.stringify(value))
})
// 搜索框圆角
subscribeKey(state, 'searchRadius', (value) => {
  LocalStorageSetItem('searchRadius', JSON.stringify(value))
})
// 搜索结果是否屏蔽CSDN
subscribeKey(state, 'fuckCSDN', (value) => {
  LocalStorageSetItem('fuckcsdn', JSON.stringify(value))
})

export default state