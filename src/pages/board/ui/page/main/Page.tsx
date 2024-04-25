import { fetchGET } from '@/shared/api/base.api';
import { useSuspenseQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

interface PostItem {
  id: string;
  title: string;
  content: string;
  writer: string;
  type: string;
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
        staleTime: 30 * 1000,
      },
    ],
  });

  const posts = useMemo(() => [...post1, ...post2], [post1, post2]);

  return (
    <div>
      {posts.map((item: PostItem) => (
        <div key={item.id} style={{ border: '1px solid gray' }}>
          <Link to={`/board/${item.type}/${item.id}`}>
            <div>제목: {item.title}</div>
            <div>내용 요약: {item.content}</div>
            <div>조회 수: {item.views}</div>
            <div>타입: {item.type}</div>
          </Link>
        </div>
      ))}
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
