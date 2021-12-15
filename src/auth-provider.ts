//在真实环境下，如果使用firebase第三方auth服务，不需开发
import { User } from 'screens/project-list/search-panel'

const localStorageKey = '__auth_privider_token__'
const apiUrl = process.env.REACT_APP_API_URL
export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    }
  })
}
export const logout = () => window.localStorage.removeItem(localStorageKey)