import { Suspense } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGET } from '@/shared/api/base.api';

const BoardDetail = () => {
  const { category, postId } = useParams() as {
    category: string;
    postId: string;
  };
  const validCategories = ['news', 'question'];
  if (!validCategories.includes(category)) throw new Error('not access');

  const { data, isLoading } = useQuery({
    queryKey: ['detail', category, postId],
    queryFn: async () => await fetchGET(`${category}/${postId}`),
    staleTime: 3 * 60 * 1000,
  });

  if (isLoading) return <div>스켈레톤 ui</div>;

  return data ? (
    <div>
      <div>
        <h2>제목: {data.title}</h2>
        <h4>내용: {data.content}</h4>
        <h5>조회수: {data.views}</h5>
      </div>
    </div>
  ) : (
    <div>게시글이 존재하지 않음.</div>
  );
};

const Suspensed = () => (
  <Suspense fallback={<div>데이터를 가져오는중...</div>}>
    <BoardDetail />
  </Suspense>
);

export const BoardDetailPage = withErrorBoundary(Suspensed, {
  fallbackRender: ({ resetErrorBoundary }) => (
    <div>
      There was an error!
      <button onClick={() => resetErrorBoundary()}>Try Again!</button>
      <button onClick={() => window.history.go(-1)}>돌아가기</button>
    </div>
  ),
});
