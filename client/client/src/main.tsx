import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import {AuthProvider} from './contetxt/AuthContext.jsx'
import { LoginPage, RegisterPage} from './pages/index.js'


import './index.css'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AppLayout from './pages/AppLayout.js'
import PageLayout from './pages/general/PageLayout.js'
import ViewPage from './pages/general/ViewPage.jsx'
import AddPage from './pages/general/AddPage.jsx'
import EditPage from './pages/general/EditPage.jsx'

const ErrorPage = () => {
  return(
    <h1>Ooopppssss</h1>
  )
}

// import {router} from './routes/router.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

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
    path: '/',
    children: [
      {
        path: '/:type',
        element: <PageLayout />,
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
          }
        ]
      }
    ]
  },
  // {
  //     element: <MoviesLayout />,
  //     path: 'movies',
  //     children: [
  //         {
  //             element: 
  //             <ProtectedRoute dataType={'Movies'} functionality={'Create'}>
  //               <AddMoviePage />
  //             </ProtectedRoute> ,
  //             path: 'add'
  //         },
  //         {
  //             element: <EditMoviePage />,
  //             path: 'edit/:movieId'
  //         },
  //         {
  //             element: <MoviesPage />,
  //             index: true
  //         }
  //     ]
  // },
  {
    path: 'error',
    element: <ErrorPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
          <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
