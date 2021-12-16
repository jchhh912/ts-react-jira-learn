import { useAuth } from 'context/auth-context'
import { ProjectListScreerns } from 'screens/project-list'

//登录状态的app  登陆后
export const AuthenticaedApp = () => {
  //注销
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreerns />
    </div>
  )
}
