import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import { Category } from '@/pages/Category';
import { Sub } from '@/pages/Category/Sub';
import { Goods } from '@/pages/Goods';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';

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
        path: 'detail/:id',
        element: <Goods />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
