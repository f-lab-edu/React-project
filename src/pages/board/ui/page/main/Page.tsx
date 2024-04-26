import { Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { useSuspenseQueries } from '@tanstack/react-query';
import { fetchGET } from '@/shared/api/base.api';

interface PostItem {
  id: string;
  title: string;
  content: string;
  writer: string;
  category: string;
  views: number;
}

export const BoardList = () => {
  const [{ data: post1 }, { data: post2 }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['news'],
        queryFn: () => fetchGET('news'),
        staleTime: 60 * 1000,
      },
      {
        queryKey: ['question'],
        queryFn: () => fetchGET('question'),
        staleTime: 60 * 1000,
      },
    ],
  });

  const posts = useMemo(() => [...post1, ...post2], [post1, post2]);

  return (
    <div>
      <div>
        {posts.map((item: PostItem) => (
          <div
            key={item.id}
            style={{ border: '1px solid gray', padding: '10px' }}
          >
            <Link to={`/board/${item.category}/${item.id}`}>
              <div>{item.title}</div>
              <p>{item.content}</p>
              <div>조회 수: {item.views}</div>
              <div>타입: {item.category}</div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Link to="/board/write">write</Link>
      </div>
    </div>
  );
};

const Suspensed = () => (
  <Suspense fallback={<div>fetching...</div>}>
    <BoardList />
  </Suspense>
);

export const BoardListPage = withErrorBoundary(Suspensed, {
  fallbackRender: ({ resetErrorBoundary }) => (
    <div>
      There was an error!
      <button onClick={() => resetErrorBoundary()}>Try Again!</button>
    </div>
  ),
});
