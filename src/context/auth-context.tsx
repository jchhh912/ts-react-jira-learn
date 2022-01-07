import React, { ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

//定义一个接受类
interface AuthForm {
  username: string
  password: string
}
//初始化用户,去查找token  保持登录状态
const bootstapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}
//指定泛型类型 创建Context
const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

//主要的逻辑处理
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //指定泛型 或者 null
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser
  } = useAsync<User | null>()
  //可以转变以下写法 const login = (from: AuthForm) => auth.login(from).then(user=>setUser(user))
  const login = (from: AuthForm) => auth.login(from).then(setUser)
  const register = (from: AuthForm) => auth.register(from).then(setUser)
  //通过在logout中加async 返回一个param
  const logout = () => auth.logout().then(() => setUser(null))
  //页面加载时调用初始化
  useMount(() => {
    run(bootstapUser())
  })
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

//自定义Hock
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
