import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.scss';
import AboutPage from './pages/AboutPage/AboutPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: '',
        element: <AboutPage />,
      },
      {
        path: '/info',
        element: <AboutPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />
      }
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
