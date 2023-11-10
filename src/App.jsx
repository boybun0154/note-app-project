import Board from '~/pages/Boards/_id'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import SignIn from './pages/Auth/Signin'
import SignUp from './pages/Auth/Signup'

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const boardId = "654a2bd9ba34f2d67a98ddcb";
      return redirect(`/boards/${boardId}`)
    }
  },
  {
    path: '/boards/:boardId',
    element: <Board />
  },
  {
    path: '/signin',
    element: <SignIn />
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
