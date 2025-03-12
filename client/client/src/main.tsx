import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { AuthProvider } from './contetxt/AuthContext.jsx'
import { LoginPage, RegisterPage } from './pages/index.js'


import './index.css'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AppLayout from './pages/AppLayout.js'
import ViewPage from './pages/general/ViewPage.jsx'
import AddPage from './pages/general/AddPage.jsx'
import EditPage from './pages/general/EditPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import store from './redux/store.js'
import queryClient from './configs/reactQuery.js'
import PopUp from './components/common/PopUp.jsx'



// import {router} from './routes/router.js'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false
//     }
//   }
// })

const router = createBrowserRouter([
  {
    element: <LoginPage />,
    path: '/',
    index: true
  },
  {
    element: <RegisterPage />,
    path: 'register',
  },
  {
    element: <AppLayout />,
    path: '/:type',
    children: [
      {
        path: '',
        element:
          <ProtectedRoute >
            <ViewPage />
          </ProtectedRoute>
      },
      {
        path: 'add',
        element:
          <ProtectedRoute functionality='add'>
            <AddPage />
          </ProtectedRoute>
      },
      {
        path: 'edit',
        element:
          <ProtectedRoute functionality='edit'>
            <EditPage />
          </ProtectedRoute>
      },
      {
        path: 'error',
        element: <ErrorPage />,
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider >
        <RouterProvider router={router} />
        <PopUp />
      </AuthProvider>
    </Provider>
  </QueryClientProvider>


)
