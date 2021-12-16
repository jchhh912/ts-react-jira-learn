import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const apiUrl = process.env.REACT_APP_API_URl
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

//创建一个http hock
export const useHttp = () => {
  const { user } = useAuth()
  //parameters 获取类中的参数类型 =》操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
}
