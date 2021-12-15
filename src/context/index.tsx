import { ReactNode } from 'react'
import { AuthProvider } from './auth-context'

//入口文件
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}
