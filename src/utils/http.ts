import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
import { type } from 'os'

const apiUrl = process.env.REACT_APP_API_URL
interface Config extends RequestInit {
  token?: string
  data?: object
}
//通用异步请求方法
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  //customConfig会覆盖以下 所以method不是固定 而是默认的
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  //axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2XX时抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      //抛出错误
      return Promise.reject(data)
    }
  })
}

//js中的typeof，是在runtime时运行的
//return typeof 1==='number'

//ts中的typeof，是在静态环境运行的
//return (...[endpoint, config]: Parameters<typeof http>) =>
//创建一个http hock
export const useHttp = () => {
  const { user } = useAuth()
  //parameters 获取类中的参数类型 =》操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
}

//联合类型
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7

//myFavoriteNumber={}
let jackFavoriteNumber: string | number

//类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string
// }
// type Person = { name: string }
// const xiaoMing: Person = { name: 'xiaoming' }
//类型别名，interface在这种情况下无法替代type
type FavoriteNumber = string | number
let roseFavoriteNumber: FavoriteNumber = '6'

//interface 也没法实现Utility type
type Person = {
  name: string
  age: number
}
//partial 当不完全获取person时，也能获取到值
const xiaoMing: Partial<Person> = {
  age: 8
}
//Omit将类型进行清洗，可以删除不需要的,生成一个新的类型
//删除Person中的name和age(使用联合类型)
const shenMiRen: Omit<Person, 'name' | 'age'> = {}
//keyof 取出键
type personKeys = keyof Person
//Exclude 对键进行剔除
type Age = Exclude<personKeys, 'name'>
//Pick 取出指定的键
type PersonOnlyName = Pick<Person, 'name' | 'age'>
