import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import React from 'react'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
/**
 * grid和flex各自的应用场景
 * 1.要考虑是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2.从内容出发还是从布局出发？
 * 从内容出发：是先有内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网络布局（数量一般比较固定），然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 * @returns
 */

//登录状态的app  登陆后
export const AuthenticaedApp = () => {
  //注销
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}
//1fr 等于自适应 剩下来的都属于它
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
//grid-area 用来给grid子元素起名字
const Header = styled(Row)``

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div``

const Main = styled.main``
