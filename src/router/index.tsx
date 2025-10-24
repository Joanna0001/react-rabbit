import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import { Category } from '@/pages/Category';
import { Sub } from '@/pages/Category/Sub';

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
        path: 'category/:id',
        element: <Category />,
      },
      {
        path: 'category/sub/:id',
        element: <Sub />,
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
