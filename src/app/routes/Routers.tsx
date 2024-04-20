import { createBrowserRouter } from 'react-router-dom';
import { Error404Page } from '@/pages/error/ui';
import { MainPage } from '@/pages/main/ui/page/Page';
import { Layout } from '@/widgets/Layout/ui/layout/Layout';
import { BoardViewPage } from '@/pages/board/ui/page/view/Page';
import { BoardWritePage } from '@/pages/board/ui';

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
            element: <BoardViewPage />,
          },
          {
            path: 'write',
            element: <BoardWritePage />,
          },
          {
            path: ':boardId',
            element: <div>본문</div>,
          },
        ],
      },
    ],
  },
]);
