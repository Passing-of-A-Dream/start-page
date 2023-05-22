import { constant, cssVarModify } from "@/utils/utils";
import { proxy } from "valtio";
import { subscribeKey, watch } from 'valtio/utils'
import { isLocalStorage, LocalStorageSetItem } from "./utils"

interface State {
  dateSeconds: boolean
  themeColor: string
  outOpenSearch: boolean
  outOpenBookmarks: boolean
  searchRadius: number
  fuckCSDN: boolean
  isSimpleMode: boolean
  contextMenu: {
    show: boolean
    x: number
    y: number
  }
  modalShow: boolean
  backgroundImage: string
  oneLanguage: boolean
  bingImage: boolean
  backImageBlur: boolean
  [key: string]: any
}

const state = proxy<State>({
  dateSeconds: isLocalStorage('dateSeconds', 'boolean').booleanVal, // 是否显示秒
  themeColor: constant.THEME_COLOR, // 主题颜色
  outOpenSearch: isLocalStorage('outOpenSearch', 'boolean').booleanVal, // 是否在新标签页打开搜索结果
  outOpenBookmarks: isLocalStorage('outOpenBookmarks', 'boolean').booleanVal, // 是否在新标签页打开书签
  searchRadius: Number(isLocalStorage('searchRadius', 'string').strValue), // 搜索框圆角
  fuckCSDN: isLocalStorage('fuckcsdn', 'boolean').booleanVal, // 搜索结果是否屏蔽CSDN
  isSimpleMode: isLocalStorage('isSimpleMode', 'boolean').booleanVal,
  contextMenu: {
    show: false,
    x: 0,
    y: 0,
  },
  modalShow: false,
  backgroundImage: isLocalStorage('backgroundImage', 'string').strValue,
  oneLanguage: isLocalStorage('oneLanguage', 'boolean').booleanVal,
  bingImage: isLocalStorage("bingImage", "boolean").booleanVal,
  backImageBlur: isLocalStorage("backImageBlur", "boolean").booleanVal
})
// 是否显示秒
subscribeKey(state, 'dateSeconds', (value) => LocalStorageSetItem('dateSeconds', value))
// 是否在新标签页打开
subscribeKey(state, 'outOpenSearch', (value) => LocalStorageSetItem('outOpenSearch', value))
subscribeKey(state, 'outOpenBookmarks', (value) => LocalStorageSetItem('outOpenBookmarks', value))
// 搜索框圆角
subscribeKey(state, 'searchRadius', (value) => LocalStorageSetItem('searchRadius', value))
// 搜索结果是否屏蔽CSDN
subscribeKey(state, 'fuckCSDN', (value) => LocalStorageSetItem('fuckcsdn', value))
// 是否是简洁模式
subscribeKey(state, "isSimpleMode", (value) => LocalStorageSetItem("isSimpleMode", value))
// 背景图片
subscribeKey(state, 'backgroundImage', (value) => LocalStorageSetItem("backgroundImage", value))
// 底部一言是否点击切换
subscribeKey(state, 'oneLanguage', (value) => LocalStorageSetItem("oneLanguage", value))
// 每日bing图
subscribeKey(state, "bingImage", (value) => LocalStorageSetItem("bingImage", value))
// 背景模糊
subscribeKey(state, "backImageBlur", (value) => LocalStorageSetItem("backImageBlur", value))

export default state