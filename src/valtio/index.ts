import { constant } from "@/utils/utils";
import { proxy } from "valtio";
import { subscribeKey, watch } from 'valtio/utils'

// 判断传入的字符串是否是本地存储的
const isLocalStorage: (str: string) => boolean = (str) => {
  if (localStorage.getItem(str)) {
    return localStorage.getItem(str) === 'true' ? true : false
  } else {
    return false
  }
}

type State = {
  dateSeconds: boolean,
  themeColor: string,
  // outOpen: boolean,
  outOpenSearch: boolean,
  outOpenBookmarks: boolean,
};

const state = proxy<State>({
  dateSeconds: isLocalStorage('dateSeconds'), // 是否显示秒
  themeColor: constant.THEME_COLOR, // 主题颜色
  outOpenSearch: isLocalStorage('outOpenSearch'), // 是否在新标签页打开搜索结果
  outOpenBookmarks: isLocalStorage('outOpenBookmarks'), // 是否在新标签页打开书签
})
// 是否显示秒
subscribeKey(state, 'dateSeconds', (value) => {
  localStorage.setItem('dateSeconds', JSON.stringify(value))
})
// 是否在新标签页打开
subscribeKey(state, 'outOpenSearch', (value) => {
  localStorage.setItem('outOpen', JSON.stringify(value))
})
subscribeKey(state, 'outOpenBookmarks', (value) => {
  localStorage.setItem('outOpen', JSON.stringify(value))
})

export default state