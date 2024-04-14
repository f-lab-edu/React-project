import { createBrowserRouter } from 'react-router-dom';
import { Error404Page } from '@/pages/error';
import { MainPage } from '@/pages/main/ui/Page/Page';
import { Layout } from '@/widgets/Layout/ui/Layout/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/board',
        element: <div>board</div>,
      },
    ],
  },
]);
