import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Home from '@/pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
