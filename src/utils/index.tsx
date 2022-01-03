import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}
//Hock 函数
//页面加载时 只加载一次的函数
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    //TODO 依赖项里加上callback会造成无限循环，这个和useCallback和useMount有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
//减少请求频率  //unknow 无法被读取 可使用any来返回  后续使用泛型规范
export const useDebounce = <V,>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    //每次value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    //每次在上一个useEffect处理完以后再运行  清理timeout 只保留最后一个
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
