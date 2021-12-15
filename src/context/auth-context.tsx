import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'

//定义一个接受类
interface AuthForm {
  username: string
  password: string
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
  const [user, setUser] = useState<User | null>(null)
  //可以转变以下写法 const login = (from: AuthForm) => auth.login(from).then(user=>setUser(user))
  const login = (from: AuthForm) => auth.login(from).then(setUser)
  const register = (from: AuthForm) => auth.register(from).then(setUser)
  //通过在logout中加async 返回一个param
  const logout = () => auth.logout().then(() => setUser(null))
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
