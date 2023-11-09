import Board from '~/pages/Boards/_id'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/Auth/Signin'
import SignUp from './pages/Auth/Signup'

const router = createBrowserRouter([
  {
    path: '/',
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
