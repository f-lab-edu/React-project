import { createBrowserRouter, Navigate } from 'react-router-dom';
import { BoardNotFoundPage, Error404Page } from '@/pages/error/ui';
import { MainPage } from '@/pages/main/ui/page/Page';
import { Layout } from '@/widgets/Layout/ui/layout/Layout';
import { BoardListPage } from '@/pages/board/ui/page/main/Page';
import { BoardWritePage } from '@/pages/board/ui';
import { BoardDetailPage } from '@/pages/board/ui/page/detail/Page';

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
        children: [
          {
            index: true,
            element: <BoardListPage />,
          },
          {
            path: 'write',
            element: <BoardWritePage />,
          },
          {
            path: ':category',
            element: <Navigate to="/board" replace={true} />,
          },
          {
            path: ':category/:postId',
            element: <BoardDetailPage />,
            errorElement: <BoardNotFoundPage />,
          },
        ],
      },
    ],
  },
]);
