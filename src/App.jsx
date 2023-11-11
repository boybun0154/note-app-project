import Board from '~/pages/Boards/_id'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/Auth/Signin'
import SignUp from './pages/Auth/Signup'
import BoardList from '~/pages/Boards/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/boards',
    element: <BoardList />
  },
  {
    path: '/boards/:boardId',
    element: <Board />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
