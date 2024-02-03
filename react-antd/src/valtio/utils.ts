type ILocalStorage = (str: string, type: "string" | "boolean") => { booleanVal: boolean, strValue: string, is: boolean }
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

const LocalStorageSetItem = (key: string, value: string | boolean | number) => {
  value = JSON.stringify(value)
  if (isLocalStorage(value, 'string').is) {
    // 如果存在判断是否相同
    if (isLocalStorage(value, 'string').strValue !== String(value)) {
      localStorage.setItem(key, value)
    }
    return false
  }
  localStorage.setItem(key, value)
}

export {
  isLocalStorage,
  LocalStorageSetItem
}