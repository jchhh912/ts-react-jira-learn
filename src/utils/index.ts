import Title from 'antd/lib/skeleton/Title'
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
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    //每次value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    //每次在上一个useEffect处理完以后再运行  清理timeout 只保留最后一个
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
//Hock方法
export const useArray = <T>(initialArray: T[]) => {
  //获取数据模型
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    //添加一个泛型数组支持单个T 添加和多个
    add: (item: T) => setValue([...value, item]),
    //赋值空数组
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      //浅拷贝
      const copy = [...value]
      //切割第一个
      copy.splice(index, 1)
      //赋值
      setValue(copy)
    }
  }
}

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitil = document.title
  console.log('渲染时的oldTitle', oldTitil)
  useEffect(() => {
    document.title = title
  }, [Title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        console.log('卸载时的oldTitil', oldTitil)
        document.title = oldTitil
      }
    }
  }, [])
}
