import { Suspense, useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGET } from '@/shared/api/base.api';
import { CommentsList } from '@/widgets/comment';
import { AddComment } from '@/features/comment/addition';

const BoardDetail = () => {
  const [isLoadedDetail, setIsLoadedDetail] = useState(false);
  const { category, postId } = useParams() as {
    category: string;
    postId: string;
  };
  const validCategories = ['news', 'question'];
  if (!validCategories.includes(category)) throw new Error('not access');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', category, postId],
    queryFn: async () => await fetchGET(`${category}/${postId}`),
    staleTime: 3 * 60 * 1000,
  });

  useEffect(() => {
    if (data && !isError) {
      setIsLoadedDetail(true);
    }
  }, [isError, data]);

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => await fetchGET(`comments?postId=${postId}`),
    enabled: isLoadedDetail,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <div>Skeleton UI</div>;

  return data ? (
    <div>
      <div>
        <h2>Title: {data.title}</h2>
        <h4>Content: {data.content}</h4>
        <h5>Views: {data.views}</h5>
      </div>
      {commentsLoading && <div>loading...</div>}
      {comments && (
        <>
          <CommentsList comments={comments} />
          <AddComment category={category} postId={postId} />
        </>
      )}
    </div>
  ) : (
    <div>Empty content!</div>
  );
};

const Suspensed = () => (
  <Suspense fallback={<div>fetching...</div>}>
    <BoardDetail />
  </Suspense>
);

export const BoardDetailPage = withErrorBoundary(Suspensed, {
  fallbackRender: ({ resetErrorBoundary }) => (
    <div>
      There was an error!
      <button onClick={() => resetErrorBoundary()}>Try Again!</button>
      <button onClick={() => window.history.go(-1)}>back</button>
    </div>
  ),
});
